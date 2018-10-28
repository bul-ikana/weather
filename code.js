//                         //
// Basic app configuration //
//                         //
const API_URL = "http://localhost:8080/weather/weather.php";

//                      //
// Component definition //
//                      //

// Weather card //

const weather = Vue.component('weather', {
  template: '#weather',

  data () {
    return {
      title: '',
      the_temp: '',
      min_temp: '',
      max_temp: '',
      weather_state_abbr: ''
    }
  },

  props: [
    'woeid'
  ],

  mounted () {
    axios
      .get(API_URL, {
        params: {
          command: 'location',
          woeid: this.woeid
        }
      })
      .then( response => {
        this.title = response.data.title
        this.the_temp = response.data.consolidated_weather[0].the_temp
        this.min_temp = response.data.consolidated_weather[0].min_temp
        this.max_temp = response.data.consolidated_weather[0].max_temp
        this.weather_state_abbr = response.data.consolidated_weather[0].weather_state_abbr
      })
  },

  filters: {
    celcius: function (value) {
      if (!value) return ''

      return Math.round(value) + '°'
    }
  }
})


//                //
// Vue definition //
//                //

var vm = new Vue({
  el: '#app'
})
