if (Meteor.isClient) {

  Template.trackerTest.created = function(){
    a1=new ReactiveVar(1);
    a2=new ReactiveVar(2);

    //autorunへの登録
    Tracker.autorun(function(){
      console.log("log(1) a1="+a1.get());
    });
    Tracker.autorun(function(){
      console.log("log(2) a1="+a1.get()+",a2="+a2.get());
    });
    Tracker.autorun(function(){
      console.log("log(3) a2="+a2.get());
    });
  };

  Template.trackerTest.helpers({
    a1:function(){
      return a1.get();
    },
    a2:function(){
      return a2.get();
    }
  });

}
