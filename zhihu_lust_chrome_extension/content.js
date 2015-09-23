alert("hello world!");


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

function hack_zhihu_get_all_answer_ids()
{
  anslist = $(".zm-item-answer");
  for (ansobj in anslist)
  {
    console.log(ansobj.attr("data-aid"));// here
  }
  // console.log(listtt);
  console.log(ppp);
}

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
  console.log(request);
  var xsrf = hack_zhihu_get_xsrf();
  hack_zhihu_like("17679778", xsrf);
  hack_zhihu_get_all_answer_ids();
});
