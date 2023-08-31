(function($){
	console.log('Admin');
	console.log('Admin 2');
	
	if ( $('.wp-admin.post-php').length > 0 || $('.wp-admin.post-new-php').length > 0 ) {
		
		//Disable Autocomplete Fields
		$('.cx-ui-container input#_address, .cx-ui-container input#_distance').css({
			'opacity': 0.5,
			'pointer-events': 'none'
		});
		
		//On Change of Address
		$('body').on('input', '.cx-ui-container input#_address', function(){
			var mapfrom = $('.cx-ui-select-wrapper select#_state_location').val(), //'Witney, Oxfordshire'
				mapto = $(this).val(); //'Cogges Surgery, Cogges Hill Road, Witney OX28 3FP'
			
			console.log(mapfrom);
			console.log('MapTo'+mapto);

			jQuery.post( my_ajax_object.ajax_url, {
				action: "pt_get_distance",
				from: mapfrom.replaceAll(' ', '%20'),
				to: mapto.replaceAll(' ', '%20'),
			}, function(data) {
				console.log(parseFloat(data));
				if ( data.includes('ft') ) {
					var miles = parseFloat(data) / 5280;
					$('.cx-ui-container input#_distance').val(miles.toFixed(2));
				} else {
					$('.cx-ui-container input#_distance').val(parseFloat(data));
				}
			});
		});
		
		//On Change of Location
		$('body').on('input', '.cx-ui-select-wrapper select#_state_location', function(){
			var mapfrom = $(this).val(), //'Witney, Oxfordshire'
				mapto = $('.cx-ui-container input#_address').val(); //'Cogges Surgery, Cogges Hill Road, Witney OX28 3FP'
			
			console.log(mapfrom);

			jQuery.post( my_ajax_object.ajax_url, {
				action: "pt_get_distance",
				from: mapfrom.replaceAll(' ', '%20'),
				to: mapto.replaceAll(' ', '%20'),
			}, function(data) {
				console.log(parseFloat(data));
				console.log(data);
				if ( data.includes('ft') ) {
					var miles = parseFloat(data) / 5280;
					$('.cx-ui-container input#_distance').val(miles.toFixed(2));
				} else {
					$('.cx-ui-container input#_distance').val(parseFloat(data));
				}
				
			});
		});
		
		//On Change of Address P1
		$('body').on('input', '.cx-ui-container input#_address_p1, .cx-ui-container input#_address_p2, .cx-ui-container input#_address_p3, .cx-ui-container input#_address_p4, .cx-ui-container input#_address_p5, .cx-ui-container input#_address_p6', function(){
			var p1 = $('.cx-ui-container input#_address_p1').val(),
				p2 = $('.cx-ui-container input#_address_p2').val(),
				p3 = $('.cx-ui-container input#_address_p3').val(),
				p4 = $('.cx-ui-container input#_address_p4').val(),
				p5 = $('.cx-ui-container input#_address_p5').val(),
				p6 = $('.cx-ui-container input#_address_p6').val();
			
			//P1
			if ( p1 != '' ) {
				p1 = p1 + ', ';
			} else {
				p1 = '';
			}
			
			//P2
			if ( p2 != '' ) {
				p2 = p2 + ', ';
			} else {
				p2 = '';
			}
			
			//P3
			if ( p3 != '' ) {
				p3 = p3 + ', ';
			} else {
				p3 = '';
			}
			
			//P4
			if ( p4 != '' ) {
				p4 = p4 + ', ';
			} else {
				p4 = '';
			}
			
			//P5
			if ( p5 != '' ) {
				p5 = p5 + ', ';
			} else {
				p5 = '';
			}
			
			//P6
			if ( p6 != '' ) {
				p6 = p6;
			} else {
				p6 = '';
			}
			
			var fulladdress = p1+''+p2+''+p3+''+p4+''+p5+''+p6;
			
			console.log(fulladdress);
			
			//Update Main Address Field
			$('.cx-ui-container input#_address').val(fulladdress).trigger('input');

			
		});
		
	}
	
	//Location Search
	$('body').on('click', '.home-loc-search-btn a', function(e){
		e.preventDefault();
		
		var loclink = $('.loc-dropdown select option:selected').attr('data-link');
		
		location.href = loclink;
	})
	
	
	
})(jQuery);