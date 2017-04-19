	(function(){
		var link = document.getElementsByTagName("a")[0];
		link.onmouseover = function(){
			link.onmouseover = null;
			var segs = ["create-smart-things-with-us", "we're-hiring!"],
				party = ["(>'-')>","^('-')^","<('-'<)","^('-')^"],
				str,
				mode = 0,
			    i=0,j=0,
			    defaultTimeout=25,
			    timeout=defaultTimeout;
			var playTimer = window.setTimeout(function moar(){
			    if ( i < segs.length ) {
			        str = segs[i].split("");
			        if ( j <= (str.length * 2)){
			           if(j === str.length){mode = 1;}
			           var pos = mode === 0 ? j : str.length + (str.length - j);
			           window.history.pushState("", "", "/#" + str.slice(0, pos ).join(""));
			           j++;
			        }
			        else {
			            mode=j=0;
			            i++;
			            timeout = defaultTimeout;
			            window.history.pushState("", "", "/#");
			        }
			        playTimer = window.setTimeout(moar, timeout);
			        timeout = defaultTimeout  * 2;
			    }
			    else {
			       if( j >= party.length){j=0;}
			       window.history.pushState("", "", "#" + party[j]);
			       j++;
			       playTimer = window.setTimeout(moar, 300);
			    }
			}, timeout);
		};
	}());