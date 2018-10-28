//                         //
// Basic app configuration //
//                         //
const API_URL = "";

//                      //
// Component definition //
//                      //

// Weather card //
const weather = Vue.component('weather', {
  template: '#weather',

  data () {
    return {
      loading: true,
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
        this.loading = false
      })
  },

  filters: {
    celsius: function (value) {
      if (!value) return ''

      return Math.round(value) + '°'
    }
  }
})

const weatherline = Vue.component('weatherline', {
  template: '#weatherline',

  props: [
    'applicable_date',
    'weather_state_abbr',
    'the_temp',
    'min_temp',
    'max_temp'
  ],

  filters: {
    dayofweek: function (value) {
      if (!value) return ''
      return moment(value).format('dddd')
    },
    celsius: function (value) {
      if (!value) return ''

      return Math.round(value) + '°'
    }
  }
})

// frontpage
const frontpage = Vue.component('frontpage', {
  template: '#frontpage'
})

// searchpage
const searchpage = Vue.component('searchpage', {
  template: '#searchpage',

  data () {
    return {
      locations: [],
      loading: true
    }
  },

  props: [
    'keyword'
  ],

  mounted () {
    axios
      .get(API_URL, {
        params: {
          command: 'search',
          keyword: this.keyword
        }
      })
      .then( response => {
        console.log(response.data)
        this.locations = response.data
        this.loading =  false
      })
  },

  beforeRouteUpdate (to, from, next) {
    this.loading = true

    console.log("to", to)
    console.log("from", from)
    console.log("next", next)
    axios
      .get(API_URL, {
        params: {
          command: 'search',
          keyword: to.params.keyword
        }
      })
      .then( response => {
        console.log(response.data)
        this.locations = response.data
        this.loading =  false
        next();
      })

  }
})

// detailspage
const detailspage = Vue.component('detailspage', {
  template: '#detailspage',

  props: [
    'woeid'
  ],

  data () {
    return {
      title: '',
      consolidated_weather: [],
      loading: true
    }
  },

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
        this.consolidated_weather = response.data.consolidated_weather
        this.loading = false
      })
  }
})

//                   //
// Router definition //
//                   //

const router = new VueRouter ({
  routes: [
    {
      path: '/',
      name: 'Front',
      component: frontpage
    },
    {
      path: '/search/:keyword',
      name: 'Search',
      component: searchpage,
      props: true
    },

    {
      path: '/weather/:woeid',
      name: 'Details',
      component: detailspage,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})


//                //
// Vue definition //
//                //

var vm = new Vue({
  el: '#app',
  router,
  data () {
    return {
      keyword: ''
    }
  }
})
