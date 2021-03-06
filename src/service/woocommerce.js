import Vue from 'vue'
import VueResource from 'vue-resource'
import WooCommerceAPI from 'woocommerce-api'
import { API_ROOT } from './root'

// config here
// (TEST DATA)
const CONSUMER_KEY = 'ck_875c8473969a782d4b673b8431ee78d22a8a5cfb'
const CONSUMER_SECRET = 'cs_1e701c425a5dc40244f5a6785de98f5762e36634'
// endpoints
// orders, payment, products

Vue.use(VueResource)
//
Vue.http.options.crossOrigin = true

const WooCommerce = new WooCommerceAPI({
  url: API_ROOT,
  consumerKey: CONSUMER_KEY,
  consumerSecret: CONSUMER_SECRET,
  wpAPI: true,
  version: 'wc/v2'
})

export default {
  getProducts() {
    return new Promise((resolve, reject) => {
      WooCommerce.getAsync('products?per_page=99').then(
        response => {
          resolve(JSON.parse(response.toJSON().body))
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getProduct(slug) {
    return new Promise((resolve, reject) => {
      WooCommerce.getAsync('products/?slug=' + slug + '').then(
        response => {
          resolve(JSON.parse(response.toJSON().body)[0])
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getProductVariations(id) {
    return new Promise((resolve, reject) => {
      WooCommerce.getAsync('products/' + id + '/variations').then(
        response => {
          resolve(JSON.parse(response.toJSON().body))
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getProductCategories() {
    return new Promise((resolve, reject) => {
      WooCommerce.getAsync('products/categories').then(
        response => {
          resolve(JSON.parse(response.toJSON().body))
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getShippingZones() {
    return new Promise((resolve, reject) => {
      WooCommerce.getAsync('shipping/zones').then(
        response => {
          resolve(JSON.parse(response.toJSON().body))
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getShippingZoneLocations(id) {
    return new Promise((resolve, reject) => {
      WooCommerce.getAsync('shipping/zones/' + id + '/locations').then(
        response => {
          resolve(JSON.parse(response.toJSON().body))
        },
        response => {
          reject(response)
        }
      )
    })
  },
  getShippingZoneMethods(id) {
    return new Promise((resolve, reject) => {
      WooCommerce.getAsync('shipping/zones/' + id + '/methods').then(
        response => {
          resolve(JSON.parse(response.toJSON().body))
        },
        response => {
          reject(response)
        }
      )
    })
  },
  placeOrder(data) {
    return new Promise((resolve, reject) => {
      WooCommerce.postAsync('orders', data).then(
        response => {
          resolve(JSON.parse(response.toJSON().body))
        },
        response => {
          reject(response)
        }
      )
    })
  },
  payOrder(data) {
    return new Promise((resolve, reject) => {
      WooCommerce.postAsync('stripe-payment', data).then(
        response => {
          resolve(JSON.parse(response.toJSON().body))
        },
        response => {
          reject(response)
        }
      )
    })
  }
}
