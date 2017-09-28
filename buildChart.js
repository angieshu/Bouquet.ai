let data = {};
let cleaned_data = {};


/** Initializing a dictionary of dictionaries.
	The key is in format 'YYYY-MM'.
	The value of each key is a dictionary, that holds department names and their amounts. **/
function dataInit() {
	let year = 2016;
	for (let month = 7; month != 6; month++) {
		if (month > 12) {
			year++;
			month = 1;
		}
		let date = year + '-';
		if (month < 10) {
			date = date + '0' + month;
		} else {
			date = date + month;
		}
		data[date] = {};
	}
	data[year + '-06'] = {};
}

function loadInfo() {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			dataInit();

			/** Parsing JSON to the object **/
			let arr = JSON.parse(this.responseText);

			/** Adding elements to the data dictionary.
			 	Calculating the total sum amount by department **/
			for (let i = 0; i < arr.length; i++) {
				let key = arr[i].month_and_year.substring(0, 7);
				if (arr[i].department in data[key]) {
					data[key][arr[i].department] += Number(arr[i].amount);
				} else {
					data[key][arr[i].department] = Number(arr[i].amount);
				}
			}

			/** Converting values in data dictionary (which are dictionaries now)
				to arrays to be able to pass it later to the chart. **/
			for (let elem in data) {
				let new_value = [];
				for (let key in data[elem]) {
					new_value.push([ key, data[elem][key] ]);
				}
				cleaned_data[elem] = new_value;
			}
		}
	};
	xhttp.open('GET', 'https://data.marincounty.org/resource/mw3d-ud6d.json', true);
	xhttp.send();
}


function updateChart() {
	let date = document.getElementById('datepicker').value;
	buildChart(date);
}

function buildChart(date) {
	Highcharts.chart('container', {
		chart: {
			type: 'column'
		},
		title: {
			text: 'Bouquet.ai Exercise'
		},
		subtitle: {
			text: 'Contract amounts in Marin Country by department'
		},
		xAxis: {
			type: 'category',
			labels: {
				rotation: -45,
				style: {
					fontSize: '13px',
					fontFamily: 'Verdana, sans-serif'
				}
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Total amount ($)'
			}
		},
		legend: {
			enabled: false
		},
		tooltip: {
			pointFormat: '<b>{point.y:,.0f} $</b>'
		},
		series: [{
			name: 'Total amount',
			data: cleaned_data[date],
		dataLabels: {
			enabled: true,
			rotation: -90,
			color: '#FFFFFF',
			align: 'right',
			format: '{point.y:,.0f}',
			y: 10,
			style: {
				fontSize: '13px',
				fontFamily: 'Verdana, sans-serif'
			}
			}
		}]
	});
}

loadInfo();
