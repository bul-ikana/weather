//                      //
// Component definition //
//                      //

// Weather card //

const weather = Vue.component('weather', {
	template: '#weather',

	props: [
		'title',
		'the_temp',
		'min_temp',
		'max_temp',
		'weather_state_abbr'
	]
})


//                //
// Vue definition //
//                //

var vm = new Vue({
  el: '#app'
});