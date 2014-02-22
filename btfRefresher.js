
(function(){
	
	var locHref = window.location.href,
	attachRefresher = function(switchStatus, intervalTime){
		document.querySelector('.liquidity-slider-marketview').style.display = 'none';
		
		var rfrshBtn = document.querySelector('.mkt-refresh-btn'),
			matchedValues = document.querySelector('.matched-values'),
			refresher = document.createElement('div'),
			valueContainer = document.createElement('div'),
			value = document.createElement('input'),
			valueText = document.createElement('span'),
			switcher = document.createElement('span'),
			interval = intervalTime || 800,
			MINIMUM = 99,
			intervalRef;
		
		refresher.className = 'refresher';
		refresher.textContent = 'Refresher';
		refresher.style.border = '1px solid #E0E6E6';
		refresher.style['borderRadius'] = '2px';
		refresher.style.margin = '0 8px';
		refresher.style.padding = '0 2px';
		refresher.style['lineHeight'] = '26px';
		refresher.style.width = '150px';
		
		switcher.style.display = 'inline-block';
		switcher.style.width = '20px';
		switcher.style.padding = '0 10px';
		switcher.style['borderLeft'] = '1px solid #E0E6E6';
		switcher.textContent = 'OFF';
		switcher.className = 'off';
		switcher.style['backgroundColor'] = '#e0c0c0';
		switcher.style.cursor = 'pointer';
		switcher.style['userSelect'] = 'none';
		
		valueContainer.style.display = 'inline-block';
		
		value.disabled = true;
		value.value = 800;
		value.style.display = 'inline-block';
		value.style.width = '30px';
		value.style.height = '26px';
		value.style.padding = '0 2px';
		value.style.border = '0';
		value.style.cursor = 'pointer';
		value.style['userSelect'] = 'none';
		value.style['marginRight'] = '3px';
		
		valueText.textContent = 'ms';
		
		if(matchedValues !== null){
			matchedValues.appendChild(refresher);
			refresher.appendChild(switcher);
			valueContainer.appendChild(value);
			valueContainer.appendChild(valueText);
			refresher.appendChild(valueContainer);
		} else {
			return false;
		}
		
		function refresherFn(){
			rfrshBtn.click();
		};
		
		switcher.onclick = function(ev){
			
			if(switcher.className === 'off'){
				//	make it on
				switcher.className = 'on';
				switcher.textContent = 'ON';
				switcher.style['backgroundColor'] = '#c0e0c4';
				
				value.textContent = interval;
				intervalRef = setInterval(refresherFn, interval);
			} else {
				//	make it off
				switcher.className = 'off';
				switcher.textContent = 'OFF';
				switcher.style['backgroundColor'] = '#e0c0c0';
				
				clearInterval(intervalRef);
				intervalRef = undefined;
			}
		};
		
		
		valueContainer.addEventListener('click', function(ev){
		
			console.log('click valueContainer');
			if(switcher.className === 'on'){
				value.disabled = false;
				value.select();
			}
		});
		
		value.onkeydown = function(ev){
			
			if(ev.keyCode === 13){
				value.blur();
			}
		};
		
		value.onblur = function(){
			value.disabled = true;
			
			if((interval !== value.value) && (value.value > MINIMUM)){
				interval = value.value;
				clearInterval(intervalRef);
				intervalRef = setInterval(refresherFn, interval);
			} else {
				value.value = interval;
			}
		};
	};

	attachRefresher();
	
	setInterval(function(){
		
		if(window.location.href !== locHref){
			attachRefresher();
			locHref = window.location.href;
		}
	},500);
	
})();