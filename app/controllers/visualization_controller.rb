class VisualizationController < ApplicationController
	skip_load_and_authorize_resource
	 skip_before_filter :authenticate_user!
def index
 @chart = LazyHighCharts::HighChart.new('graph') do |f|
    f.title({ :text=>"Foodweb Ladder Rankings"})
    f.options[:xAxis][:categories] = ['Citations']
    f.options[:yAxis][:allowDecimals] = false
User.find_each do |user|
f.series(:type=> 'column',:name=> user.email,:data=> [Citation.where(:user_id => user.id ).count ])
end  

    
      
end
end
end
