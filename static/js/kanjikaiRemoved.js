// Removed from HTML
/*  		<div id="toggleWrapper">
  			<select name="readingToggle" id="readingToggle">
				<option value="both">ON + KUN</option>
				<option value="on">ONYOMI</option>
				<option value="kun">KUNYOMI</option>
			</select>
  		</div>
*/


	var toggleExcludeMap = {
					'both': '',
					'on': 'kun',
					'kun': 'on'
					};


	toggle = document.getElementById('readingToggle');
	toggle.onchange = function() {

		//remove all current data points from nodes and links
		//data.nodes.splice(0, data.nodes.length);
		data.links.splice(0, data.links.length);

		console.log(data);

		//add in all data points we need to nodes and links
	/*	for (var i = 0; i < originalData.nodes.length; i++)
			{
				if (originalData.nodes[i].type != toggleExcludeMap[toggle.value])
					{ data.nodes.push(originalData.nodes[i]); }
			}
	*/
		for (var i = 0; i < originalData.links.length; i++)
			{
				if (originalData.links[i].type != toggleExcludeMap[toggle.value])
					{ data.links.push(originalData.links[i]); }
			}

		console.log(data);

		update();

	};
