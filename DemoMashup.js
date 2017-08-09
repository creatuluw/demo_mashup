$("#navDiv").load('navigation.html');

$(function () {
    $('.nav > ul > li > a').each(function () {
        if (window.location.pathname.indexOf($(this).attr('href')) > -1) {
            $(this).closest('li').addClass('active');
            return false;
        }
    });
});


/*global require, alert*/
/*
 *
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};
require.config( {
	baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port: "") + config.prefix + "resources"
} );

require( ["js/qlik"], function ( qlik ) {
	qlik.setOnError( function ( error ) {
		alert( error.message );
	} );

	//callbacks -- inserted here --
	// Callback function for drawing a table
	function drawTable(reply, app){}

	function test(reply, app){}

	function showCountry(reply, app){}


	$( document ).ready(function() {
		$("input[name='chart']").change(function(obj){
			$('#ToggleChart').fadeOut('fast', function(){
				app.getObject('ToggleChart',obj.target.value);
				$('#ToggleChart').fadeIn('fast');
			});
		});
	});

	//open apps -- inserted here --
	var app = qlik.openApp('Demo Mashup.qvf', config);

	app.getObject('ToggleChart','JDpwZ');

	//get objects -- inserted here --
	app.getObject('CurrentSelections','CurrentSelections');


	// Current Selections Object



	// Filters

	app.getObject('LB_Year','mbJCvkh');
	app.getObject('LB_ProductCategory','VaQjnV');
	app.getObject('LB_Country','BsenMc');

	// Dashboard - home.html

	app.getObject('KPI1','YjeJhj');
	app.getObject('KPI2','BYxvxM');
	app.getObject('KPI3','DNBpa');
	app.getObject('KPI4','eyrjfqf');
	app.getObject('CustomerGeography','LVqUFme');
	app.getObject('SalesOverTime','eBwDCmJ');
	app.getObject('SalesByCountry','Ggpaxa');
	app.getObject('OrdersByCategory','JDpwZ');

	// Customer Analysis - customers.html

	app.getObject('LB_Customer2','RBrVb');
	app.getObject('CUS1','RPdBMf');
	app.getObject('CUS2','CPjxpva');
	app.getObject('CUS3','mvkuqt');
	app.getObject('CUS4','WmHhExg');
	app.getObject('CustomersOverTime','psUdVVJ');
	app.getObject('CustomersOverSalesAndMargin','VzxsQBD');
	app.getObject('CustomersByCountry','PYcyD');

	// Product Analysis - products.html

	app.getObject('PRO1','cc2db8f5-7fbc-4032-958b-6d0f41ac5502');
	app.getObject('PRO2','c0303b2b-9ff2-4f1e-93e0-0933d7e099c2');
	app.getObject('PRO3','5141b8fc-8dda-4b73-b6f5-0ee5653a0adf');
	app.getObject('ProductsOverTime','1ab2e5b9-dd3b-4cfa-8db4-e7a08a22fba8');
	app.getObject('ProductsByCountry','3e0a1bdc-23e4-49b9-b884-9893e16c2ed9');
	app.getObject('ProductsOverSalesAndMargin','0bff5c95-2ffe-4a67-be1a-92d539ef89cf');

	// Exploration - exploration.html

	app.getObject('LB_Country2','BsenMc');
	app.getObject('LB_State','VpaP');
	app.getObject('CustomerMap','hPmAn');
	app.getObject('Margin%ByProductline','hpNhE');
	app.getObject('CustomersByEducation','JFTQBw');
	app.getObject('OrdersByCountry','KCBFd');
	app.getObject('LB_ProductSubCat','tNvmX');

	// Sales Order Details - orders.html

	app.getObject('LB_Customer','RBrVb');
	app.getObject('LB_Product','PWVdbuG');
	app.getObject('LB_Status','XRaVzcr');
	app.getObject('LB_Channel','NZNeeaa');
	app.getObject('LB_Carrier','nxgZaXk');
	app.getObject('LB_SalesOrderID','rUJHv');
	app.getObject('SalesOrderTable','HUTPvv');

	// Basket Analysis - baskets.html

	app.getObject('BasketAnalysis','jZfRsA', { noInteraction:true } ); // , { noInteraction:true }

	// What Not? - whatnot.html

	app.getObject('WhatNotMap','LVyQSXs');

	// Additional List Boxes

	app.getObject('LB_Education','XaKjuDZ');
	app.getObject('LB_Gender','ppcAAPm');
	app.getObject('LB_MaritalStatus','vMLRW');
	app.getObject('LB_Occupation','AyLrc');
	app.getObject('LB_ProductCategory2','jZxVJP');

	// Access Variables

	//var vTest2 = app.variable.getContent('vTest2',function ( reply ) {
	//			Number(reply.qContent.qString);
	//		} );
/*
		var Test;
		app.variable.getContent("vTest2", function (reply){
		   Test = Number(reply.qContent.qString);
			 alert(Test);
		});
*/
//

  // Other functions
/*
	$( "body" ).click(function() {
  	qlik.resize();
	});
*/
	// Trigger Events
  // Function to toggle hidden objects in a bootstrap popup modal
	$.fn.extend({
	  toggleResize: function() {
	    return this.toggle(400, function() {
	      qlik.resize();
	    });
	  }
	});

	// IDs for showing up on toggleResize function (see above)
	$('#ShowMap').on('click', function(event) {
     $('#LB_ProductCategory2').hide().toggleResize();
		 $('#CustomerGeography').hide().toggleResize();
		 $('#LB_MaritalStatus').hide().toggleResize();
		 $('#SalesOverTime').hide().toggleResize();
	 });

	 $('#showViz').on('click', function(event) {
 		 qlik.resize();
		 $('#SalesOverTime').hide().toggleResize();
 	 });

	 $('.fa-chevron-up').on('click', function(event) {
     $('#SalesOverTime').hide().toggleResize();
 	 });

	 // Code for dropdown filter example
	 // Populate the dropdown with data from our created list (showCountry), see below
	 function showCountry(reply, app){
     $('#DD01 .dropdown ul').empty()
     $.each(reply.qListObject.qDataPages[0].qMatrix, function(key, value) {
          if (typeof value[0].qText !== 'undefined') {
               $('#DD01 .dropdown ul').append('<li><a data-select="'+ value[0].qText+'" href="#">'+ value[0].qText+'</a></li>');
          }
     });
	 }

	 // Activate the selection of an item on click in the dropdown filter
	 $('body').on( "click", "[data-select]", function() {
     var value = $(this).data('select');
     app.field('Country').selectValues([value], false, false);
     $('#DD01 .dropdown button').html(value + ' <span class="caret"></span>');
  	});

		// Initiate all ToolTips on a page
		$(function () {
		  $('[data-toggle="tooltip"]').tooltip()
		});

/*
		// Initiate all Popovers on a page
		$(function () {
		  $('[data-toggle="popover"]').popover()
		});
*/

		// Show / Hide content based on Qlik Variable
		app.getList("SelectionObject", function(reply) { // First check if there are changes in a selection
				app.variable.getContent("vCountCustomers", function (reply) { // Then get the value of a variable
				   Test2 = Number(reply.qContent.qString);
					 console.log(Test2);
					 qlik.resize();
					 // app.getList("SelectionObject", function(reply) {    }

					 			if(Test2 == 1) {
					 					$('#CustomerDiv').show();
										$('#CustomerDiv2').show();
					 			}
					 			else if(Test2 != 1)
					 			{
					 					$('#CustomerDiv').hide();
										$('#CustomerDiv2').hide();
					 			}
					});
		});

		// Set the content of a variable based on a value in a dropdown

		$(".css").click(function() {
			app.variable.setStringValue("vChartColor", $(this).data("color"));
		});

		// Variables used for calculating What if

		app.getObject('Discount','JPjqcSJ');
		app.getObject('TotalSales','WEDLCZD');

		$("#calculateWhatIf").click(function() {
	   	app.variable.setStringValue('vDiscount', ($("#inputDiscount").val()));
	  });

    $("#resetWhatIf").click(function() {
	   	app.variable.setStringValue('vDiscount', '0');
      $('#inputDiscount').val('0'); // Set value input box to 0
	  });
/*
		$("#calculateWhatIf").click(function() {
			app.variable.setNumValue('vDiscount', $(this).data('discount'));
			app.variable.getContent('vDiscount',function ( reply ) {
			 alert( Number(reply.qContent.qString) );
			});
		});
*/



/*
		$("#calculateWhatIf").click(function() {
			app.variable.setNumValue('vDiscount', '=(1+1)');
			app.variable.getContent('vDiscount',function ( reply ) {
				alert( Number(reply.qContent.qString) );
			} );
		});
*/
		// Add a viz on the fly

		app.visualization.create('piechart',['ProductCategoryName', '=Sum([SalesAmount])'])
			.then(function(vis){
			  vis.show("CH01");
			});

		// Clear All selections
		$("#ClearAll").click(function() {
    	app.clearAll();
  	});



/*
		$(document).ready(function(){
		    var show=('#showhidediv');
		    if(show == 2) {
		        $('#ContentDivTest').show();
		    }
		    else if(show == 1)
		    {
		        $('#ContentDivTest').hide();
		    }
		});
*/

/*

	$("#ShowMap").on('click', function () {
    $(".modal").addClass("triggered").trigger("modalOpened");
	});

	$('#ExampleModal').attr('aria-hidden', 'false', function () {
    qlik.resize();
	});

	*/


//	app.variable.getContent('vTest2',function ( reply ) {
//		alert( Number(reply.qContent.qString) );
//	} );

	//create cubes and lists -- inserted here --
	// Creating a list of values for Country items for our dropdown filter example
	app.createList({
		"qFrequencyMode": "V",
		"qDef": {
				"qFieldDefs": [
						"Country"
				]
		},
		"qExpressions": [],
		"qInitialDataFetch": [
				{
						"qHeight": 20,
						"qWidth": 1
				}
		],
		"qLibraryId": "3b726470-c916-4ee9-9cd8-e2b9fcad9504"
	},showCountry);

	app.createList({
		"qFrequencyMode": "V",
		"qDef": {
				"qFieldDefs": [
						"Channel"
				]
		},
		"qExpressions": [],
		"qInitialDataFetch": [
				{
						"qHeight": 20,
						"qWidth": 1
				}
		],
		"qLibraryId": "DtufwNn"
	},test);

	// Hypercube for table data with: Country | Channel | sum(SalesAmount)
	app.createCube({
	"qInitialDataFetch": [
		{
			"qHeight": 200,
			"qWidth": 3
		}
	],
	"qDimensions": [
		{
			"qLabel": "Country",
			"qLibraryId": "3b726470-c916-4ee9-9cd8-e2b9fcad9504",
			"qNullSuppression": true,
			"qOtherTotalSpec": {
				"qOtherMode": "OTHER_OFF",
				"qSuppressOther": true,
				"qOtherSortMode": "OTHER_SORT_DESCENDING",
				"qOtherCounted": {
					"qv": "5"
				},
				"qOtherLimitMode": "OTHER_GE_LIMIT"
			}
		},
		{
			"qLabel": "Channel",
			"qLibraryId": "DtufwNn",
			"qNullSuppression": true,
			"qOtherTotalSpec": {
				"qOtherMode": "OTHER_OFF",
				"qSuppressOther": true,
				"qOtherSortMode": "OTHER_SORT_DESCENDING",
				"qOtherCounted": {
					"qv": "5"
				},
				"qOtherLimitMode": "OTHER_GE_LIMIT"
			}
		}
	],
	"qMeasures": [
		{
			"qDef": {
				"qDef": "Sum(SalesAmount)"
			},
			"qLabel": "Sum(SalesAmount)",
			"qLibraryId": null,
			"qSortBy": {
				"qSortByState": 0,
				"qSortByFrequency": 0,
				"qSortByNumeric": 0,
				"qSortByAscii": 1,
				"qSortByLoadOrder": 0,
				"qSortByExpression": 0,
				"qExpression": {
					"qv": " "
				}
			}
		}
	],
	"qSuppressZero": false,
	"qSuppressMissing": true,
	"qMode": "S",
	"qInterColumnSortOrder": [],
	"qStateName": "$"
	},drawTable);


} );
