
Counts = new Mongo.Collection("counts");

if (Meteor.isServer) {

  //初回起動時のみ実行
  Meteor.startup(function () {
    if (Counts.find().count() === 0) {
      console.log("insert testdata");
      Counts.insert({name: "c1", num: 1});
      Counts.insert({name: "c2", num: 2});
      Counts.insert({name: "c3", num: 3});
    }
  });
}

if (Meteor.isClient) {


  num = function(name){
    return Counts.findOne({name:name}).num;
  }

  set_num = function(name,num){
    var fo = Counts.findOne({name:name});
    if (fo === undefined) {
      return;
    }
    Counts.update(fo._id,{$set:{num:num}});
  }

  Template.trackerTest.rendered = function(){
    //自動実行される様子を観察ください
    Tracker.autorun(function(){
      console.log("log(1) c1=" + num("c1"));
    });

    Tracker.autorun(function(){
      console.log("log(2) c2=" + num("c2"));
    });

    Tracker.autorun(function(){
      console.log("log(3) c3=" + num("c3"));
    });

    Tracker.autorun(function(){
      console.log("log(4) c1=" + num("c1") +",c2=" + num("c2"));
    });

  }

  Template.trackerTest.helpers({
    c1:function(){ return num("c1")},
    c2:function(){ return num("c2")},
    c3:function(){ return num("c3")}
  });


}
