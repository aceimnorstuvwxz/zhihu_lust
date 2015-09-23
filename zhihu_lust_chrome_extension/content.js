//alert("hello world!");


function hack_zhihu_like(answer_id, xsrf)
{

  param = {
    method:"vote_up",
    params:"{\"answer_id\":\"" + answer_id + "\"}",
    _xsrf:xsrf
  };

  backfunc = function(){
    console.log("like back");
  };
  $.post("/node/AnswerVoteBarV2",param, backfunc);

}

function hack_zhihu_get_xsrf()
{
  var rf = $("input[name=_xsrf]").val();
  console.log("xsrf="+rf);
  return rf;
}

// 在feed界面
function hack_zhihu_get_all_answer_ids_b()
{
  anslist = $(".entry-body");
  console.log(anslist.length)
  var ret = [];
  for (var i = 0; i < anslist.length; i++) {
    var aid = anslist[i].getAttribute("data-aid");
    ret.push(aid);
  }
  return ret;
}

// 在具体问题界面
function hack_zhihu_get_all_answer_ids_a()
{
  anslist = $(".zm-item-answer");
  console.log(anslist.length)
  var ret = [];
  for (var i = 0, l = anslist.length; i < l; i++) {
    var aid = anslist[i].getAttribute("data-aid");
    ret.push(aid);
    console.log(aid);
  }
  return ret;
}

function hack_zhihu_get_all_answer_ids()
{
    var ret = hack_zhihu_get_all_answer_ids_a();
    if (ret.length == 0) {
      ret = hack_zhihu_get_all_answer_ids_b();
    }

    console.log("length of aids=" + ret.length);
    return ret;
}

function hack_zhihu_likeall()
{
  var xsrf = hack_zhihu_get_xsrf();
  var aids = hack_zhihu_get_all_answer_ids();
  console.log("aid list size="+aids.length);
  for (var i = 0; i < aids.length; i++) {
    hack_zhihu_like(aids[i], xsrf);
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
  console.log(request);
  // hack_zhihu_likeall();
});

hack_zhihu_likeall();
setInterval(hack_zhihu_likeall, 30000);
// automatic like all!
// hack_zhihu_likeall();
