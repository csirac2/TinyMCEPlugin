(function(){tinymce.create('tinymce.plugins.AdvancedImagePlugin',{init:function(ed,url){ed.addCommand('mceAdvImage',function(){if(ed.dom.getAttrib(ed.selection.getNode(),'class').indexOf('mceItem')!=-1)
return;ed.windowManager.open({file:url+'/image.htm',width:480+parseInt(ed.getLang('advimage.delta_width',0)),height:385+parseInt(ed.getLang('advimage.delta_height',0)),inline:1},{plugin_url:url});});ed.addButton('image',{title:'advimage.image_desc',cmd:'mceAdvImage'});},getInfo:function(){return{longname:'Advanced image',author:'Moxiecode Systems AB',authorurl:'http://tinymce.moxiecode.com',infourl:'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/advimage',version:tinymce.majorVersion+"."+tinymce.minorVersion};}});tinymce.PluginManager.add('advimage',tinymce.plugins.AdvancedImagePlugin);})();