<template>
  <span>
    <div id="alexa" v-html="text" v-on:click="buildclick"></div>
    <div class="build-modal" v-show="buildModal">
      <div class="build-modal-card">
        <div v-show="building">
          <p>Building Bot</p>
          <icon name="spinner" class="fa-pulse"></icon>
        </div>
        <div v-show="buildSuccess && !building">
          <p>Build Success</p>
          <icon name="check"></icon>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var Vuex=require('vuex')
var markdown=require('marked')
var handlebars=require('handlebars')
var clipboard=require('clipboard')

module.exports={
  data:function(){
    var self=this
    return {
      visible:false,
      building:false,
      buildSuccess:false,
      buildModal:false,
      clipboard:new clipboard('.clip',{
        text:function(){
          return self.$store.state.bot.alexa
        }
      })
    }
  },
  components:{
  },
  computed:Object.assign(
    Vuex.mapState([
        'bot'
    ]),
    {invalid:function(){
      return this.$validator.errors.has('filter')
    },
    text:function(){
      var temp=handlebars.compile(require('./alexa.md'))
      return markdown(temp(this.$store.state))
    }
    }
  ),
  created:function(){
    this.$store.dispatch('botinfo').catch(()=>null) 
  },
  methods:{
    build:function(){
      var self=this
      self.building=true
      self.buildModal=true
      self.$store.dispatch('build')
      .then(function(){
        self.building=false
        self.buildSuccess=true
      })
      .delay(2000)
      .then(()=>self.buildModal=false)
      .catch(self.error('failed to build'))
    },
    buildclick:function(e){
      if(e.target.className==="build"){
        this.build()
      }
    },
    error:function(reason){
      var self=this
      return function(error){
        console.log('Error',error)
        self.building=false
        self.buildSuccess=false
        self.importExportModal=false
        self.buildModal=false
        self.$store.commit('setError',reason || error)
      }
    },

  } 
}
</script>
