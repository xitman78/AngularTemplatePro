<!DOCTYPE html>
<html ng-app="SliderAdminApp">
<meta charset="utf-8">
<title>CUP-Coffee Administrator</title>
<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
<link rel=stylesheet href="../style.css">
<script src="../angular/angular.min.js" language="javascript" type="text/javascript"></script>
<script src="../js/slider_admin_ctrl.js" language="javascript" type="text/javascript"></script> 

<body ng-controller="SliderAdminCtrl" ng-init="init()">
    
&nbsp;<a href="" ng-click="load_slides()">Reload slides</a>&nbsp;&nbsp;
<a href="" ng-click="add_new_slide()">Add slide</a>&nbsp;&nbsp;
<a href="" ng-click="save_slides_list()">Save changes</a>

    <div ng-show="new_slide_form" style="border: 1px solid white; padding:10px;display:block;clear:both;margin:10px;">
        <div>
            <form action="/admin/slide_upload.php" method="post" enctype="multipart/form-data">
                Select image to upload:
                <input type="file" name="fileToUpload" id="fileToUpload">
                <input type="submit" value="Upload Image" name="submit">
            </form>&nbsp;<a href="" ng-click="load_dir_slides()">Refresh folder</a>
        </div>
        <div style="display: block;">
            <table style="width: 100%">
                <tr>
                    <td style="width:30%;">
            <div style="display: block; height:250px;overflow:scroll;border: 1px solid grey;">
                <div ng-repeat="filename in dir_slides" style="dislpay:block; height: 25px; border-bottom: 1px solid grey;" ng-style="filename == selected_file ? {'background-color':'red'} : {} ">
                    <span ng-click="select_file(filename)" style="cursor:pointer">{{filename}}<span>
                </div>
            </div>
            </td>
            <td style="width:30%;text-align: center;">
            <div>
                <img ng-if="selected_file" ng-src="../{{'slides/' + selected_file}}" width="150" height="150" border=1>
            </div>
            </td>
            <td style="width:30%;">
            <div>
                Title:<br><input type="text" size="50" ng-model="new_slide.title"><br>
                Description:<br><textarea ng-model="new_slide.description" rows="8" cols="50"></textarea><br>
                <input type="button" value="Add to the list" ng-click="save_new_slide()">
            </div>
            </td>
            </tr>
            </table>
         </div>
        
    </div>
    
    <div>
        <div ng-repeat="slide in slides_list" style="border: 1px solid white; padding:10px;display:block;clear:both;margin:10px;">
            <img ng-src="../{{slide.img_src}}" width="150px" height="150px" align="left" />
            <input type="text" ng-model="slide.title" size="50"><br>
            <textarea ng-model="slide.description" rows="8" cols="50"></textarea><br>
            <input type="checkbox" ng-model="slide.central" ng-click="change_central_slide($index)"><span class="unselected" style="cursor:pointer" ng-click="change_central_slide($index)">Central Slide</span><br>
            <input type="button" value="Move Up" ng-click="move_up($index)" ng-show="!$first">
            <input type="button" value="Move Down" ng-click="move_down($index)" ng-show="!$last">
            <input type="button" value="Delete slide" ng-click="delete_slide($index)">
        </div>
    </div>

</body>
</html>