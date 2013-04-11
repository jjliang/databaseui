class VisualizationController < ApplicationController
	skip_load_and_authorize_resource
	 skip_before_filter :authenticate_user!
def index
if user_signed_in?
 @chart = LazyHighCharts::HighChart.new('graph') do |f|
    f.title({ :text=>"Foodweb Ladder Rankings"})
    f.options[:xAxis][:categories] = ['Citations']
    f.options[:yAxis][:allowDecimals] = false
User.find_each do |user|
if user.approved == true
f.series(:type=> 'column',:name=> user.email,:data=> [Citation.where(:user_id => user.id ).count ])
end
end
end
else
@chart = LazyHighCharts::HighChart.new('graph') do |f|
    f.title({ :text=>"Foodweb Project Citations"})
    f.options[:xAxis][:categories] = ['Citations']
    f.options[:yAxis][:allowDecimals] = false
Project.find_each do |project|

if project.approved == true

f.series(:type=> 'column',:name=> project.name,:data=> [Citation.where(:project_id => project.id ).count ])
end

end
end  

    
      
end
end
end
