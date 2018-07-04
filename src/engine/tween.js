export class TweenGroup{
    constructor(){
        this._tweens = new Map()
    }
    removeAll(){
        this._tweens = new Map()
    }
    add(tween){
        this._tweens.set(tween.id,tween)
    }
    remove(tween){
        this._tweens.delete(tween.id)
    }
    update(dt){
        for(var tween of this._tweens.values()){
            if(tween.update && tween.update(dt) === false){
                tween.isPlaying = false
                this._tweens.delete(tween.id)
            }
        }
    }
}

var defaultGroup = new TweenGroup()

var id = 0
function nextId(){
    return id++
}

export class Tween{
    static addon(engine){
        engine.on("update",defaultGroup.update.bind(defaultGroup))
    }

    constructor(target,group){
        this.id = nextId()
        this._target = target
        this._group = group || defaultGroup

        this._valuesStart = {}
        this._valuesEnd = {}
        this._valuesStartRepeat = {}

        this._duration = 1000
        this._repeat = 0
        this._repeatDelayTime = undefined
        this._isPlaying = false
        this._reversed = false
        this._delayTime = 0
        this._startTime = null
        this._easingFunction = TweenEasing.Linear.None
        this._interpolation = TweenInterpolation.Linear
        this._chainedTweens = []
        this._onStart = null
        this._onStartFired = false
        this._onUpdate = null
        this._onComplete = null
        this._onStop = null 
    }

    isPlaying(){
        return this._isPlaying
    }

    to(props,duration){
        this._valuesEnd = props
        if(duration!==undefined){
            this._duration = duration
        }
        return this
    }

    start(delay){
        this._group.add(this)
        this._isPlaying = true
        this._onStartFired = false
        this._startTime = delay || 0
        this._startTime+=this._delayTime

        for(var key in this._valuesEnd){
            if(this._valuesEnd[key] instanceof Array){
                if(this._valuesEnd[key].length ==0){
                    continue
                }

                this._valuesEnd[key] = [this._target[key]].concat(this._valuesEnd[key])
            }

            if(this._target[key]===undefined){
                continue
            }

            this._valuesStart[key] = this.target[key]
            if(!this._valuesStart[key] instanceof Array){
                this._valuesStart[key] *= 1.0
            }
            this._valuesStartRepeat[key] = this._valuesStart[key] || 0
        }

        return this
    }

    stop(){
        if(!this._isPlaying){
            return this 
        }
        this._group.remove(this)
        this._isPlaying = false
        if(this._onStop){
            this._onStop(this._target)
        }
        this.stopChainedTweens()
        return this
    }

    end(){
        this.update(this._startTime + this._duration)
        return this 
    }

    stopChainedTweens(){
        for(var i =0;i<this._chainedTweens;i++){
            this._chainedTweens[i].stop()
        }
    }

    group(group){
        this._group = group
        return this
    }

    delay(amount){
        this._delayTime = amount
        return this 
    }

    repeat(times){
        this._repeat = times
        return this
    }
    repeatDelay(amount){
        this._repeatDelayTime = amount
        return this
    }
    easing(eas){
        this._easingFunction = eas
        return this
    }
    interpolation(inter){
        this._interpolation = inter
        return
    }
    chain(){
        this._chainedTweens = arguments
        return this
    }
    onStart(cb){
        this._onStart = cb
        return this
    }   
    onUpdate(cb){
        this._onUpdate = cb 
        return this
    }
    onComplete(cb){
        this._onComplete = cb 
        return this
    }
    onStop(cb){
        this._onStop = cb
        return this
    }
    update(dt){
        this._startTime -= dt
        if(this._startTime>0){
            return true
        }

        if(this._onStartFired == false){
            this._onStart && this._onStart(this._target)
            this._onStartFired = true
        }

        var elapsed = this._startTime / this._duration
        elapsed = (this._duration == 0 || elapsed > 1)?1:elapsed

        var value = this._easingFunction(elapsed)

        for(var key in this._valuesEnd){
            if(this._valuesStart[key]===undefined){
                continue
            }
            var start = this._valuesStart[key] || 0
            var end = this._valuesEnd[key] || 0
            if(end instanceof Array){
                this._target[key] = this._interpolation(end,value)
            }else{
                if( typeof(end)==="string"){
                    if(end.charAt(0)==='+' || end.charAt(0)==='-'){
                        end = start + parseFloat(end)
                    }else{
                        end = parseFloat(end)
                    }
                }
                if(typeof(end)==="number"){
                    this._target[key] = start + (end - start) * value
                }
            }
        }

        if(this._onUpdate){
            this._onUpdate(this._target)
        }

        if(elapsed == 1){
            if(this._repeat>0){
                if(isFinite(this._repeat)){
                    this._repeat--
                }
                for(var key in this._valuesStartRepeat){
                    if(typeof(this._valuesEnd[key])==="string"){
                        this._valuesStartRepeat[key] = this._valuesStart[key] + parseFloat(this._valuesEnd[key])
                    }
                    this._valuesStart[key]=this._valuesStartRepeat[key]
                }
                if(this._repeatDelayTime!==undefined){
                    this._startTime = this._repeatDelayTime
                }
                return true 
            }else{
                if(this._onComplete){
                    this._onComplete(this._target)
                }
                for(var i =0;i<this._chainedTweens.length;i++){
                    this._chainedTweens[i].start(this._startTime-this._duration)
                }
                return false
            }
        }
        return true
    }
}

export var TweenEasing = {
    Linear:{
        None: function(k){return k}
    },
    Quadratic:{
        In: function(k){return k*k},
        Out: function(k){return k*(2-k)},
        InOut: function(k){
            if((k*=2)<1){
                return 0.5 * k * k
            }
            return -0.5 *(--k*(k-2)-1)
        }
    },
    Cubic: {
		In: function (k) {return k * k * k},
		Out: function (k) {return --k * k * k + 1;},
		InOut: function (k) {
			if ((k *= 2) < 1) {
				return 0.5 * k * k * k;
			}
			return 0.5 * ((k -= 2) * k * k + 2);
		}
	},
	Quartic: {
		In: function (k) {return k * k * k * k},
		Out: function (k) {return 1 - (--k * k * k * k)},
		InOut: function (k) {
			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k;
			}
			return - 0.5 * ((k -= 2) * k * k * k - 2);
		}
	},
	Quintic: {
		In: function (k) {return k * k * k * k * k;},
		Out: function (k) {return --k * k * k * k * k + 1;},
		InOut: function (k) {
			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k * k;
			}
			return 0.5 * ((k -= 2) * k * k * k * k + 2);
		}
	},
	Sinusoidal: {
		In: function (k) {return 1 - Math.cos(k * Math.PI / 2);},
		Out: function (k) {return Math.sin(k * Math.PI / 2);},
		InOut: function (k) {return 0.5 * (1 - Math.cos(Math.PI * k));}
	},
	Exponential: {
		In: function (k) {return k === 0 ? 0 : Math.pow(1024, k - 1);},
		Out: function (k) {return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);},
		InOut: function (k) {
			if (k === 0) {
				return 0;
			}
			if (k === 1) {
				return 1;
			}
			if ((k *= 2) < 1) {
				return 0.5 * Math.pow(1024, k - 1);
			}
			return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);
		}
	},
	Circular: {
		In: function (k) {return 1 - Math.sqrt(1 - k * k);},
		Out: function (k) {return Math.sqrt(1 - (--k * k));},
		InOut: function (k) {
			if ((k *= 2) < 1) {
				return - 0.5 * (Math.sqrt(1 - k * k) - 1);
			}
			return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
		}
	},
	Elastic: {
		In: function (k) {
			if (k === 0) {
				return 0;
			}
			if (k === 1) {
				return 1;
			}
			return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
		},
		Out: function (k) {
			if (k === 0) {
				return 0;
			}
			if (k === 1) {
				return 1;
			}
			return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
		},
		InOut: function (k) {
			if (k === 0) {
				return 0;
			}
			if (k === 1) {
				return 1;
			}
			k *= 2;
			if (k < 1) {
				return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
			}
			return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
		}
	},
	Back: {
		In: function (k) {
			var s = 1.70158;
			return k * k * ((s + 1) * k - s);
		},
		Out: function (k) {
			var s = 1.70158;
			return --k * k * ((s + 1) * k + s) + 1;
		},
		InOut: function (k) {
			var s = 1.70158 * 1.525;
			if ((k *= 2) < 1) {
				return 0.5 * (k * k * ((s + 1) * k - s));
			}
			return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
		}
	},
	Bounce: {
		In: function (k) {
			return 1 - TweenEasing.Bounce.Out(1 - k);
		},
		Out: function (k) {
			if (k < (1 / 2.75)) {
				return 7.5625 * k * k;
			} else if (k < (2 / 2.75)) {
				return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
			} else if (k < (2.5 / 2.75)) {
				return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
			} else {
				return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
			}
		},
		InOut: function (k) {
			if (k < 0.5) {
				return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
			}
			return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
		}
	}
}
export var TweenInterpolation = {

	Linear: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TweenInterpolation.Utils.Linear;

		if (k < 0) {
			return fn(v[0], v[1], f);
		}

		if (k > 1) {
			return fn(v[m], v[m - 1], m - f);
		}

		return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);

	},

	Bezier: function (v, k) {

		var b = 0;
		var n = v.length - 1;
		var pw = Math.pow;
		var bn = TweenInterpolation.Utils.Bernstein;

		for (var i = 0; i <= n; i++) {
			b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
		}

		return b;

	},

	CatmullRom: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TweenInterpolation.Utils.CatmullRom;

		if (v[0] === v[m]) {

			if (k < 0) {
				i = Math.floor(f = m * (1 + k));
			}

			return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);

		} else {

			if (k < 0) {
				return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
			}

			if (k > 1) {
				return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
			}

			return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);

		}

	},

	Utils: {

		Linear: function (p0, p1, t) {

			return (p1 - p0) * t + p0;

		},

		Bernstein: function (n, i) {

			var fc = TweenInterpolation.Utils.Factorial;

			return fc(n) / fc(i) / fc(n - i);

		},

		Factorial: (function () {

			var a = [1];

			return function (n) {

				var s = 1;

				if (a[n]) {
					return a[n];
				}

				for (var i = n; i > 1; i--) {
					s *= i;
				}

				a[n] = s;
				return s;

			};

		})(),

		CatmullRom: function (p0, p1, p2, p3, t) {

			var v0 = (p2 - p0) * 0.5;
			var v1 = (p3 - p1) * 0.5;
			var t2 = t * t;
			var t3 = t * t2;

			return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

		}

	}

};
