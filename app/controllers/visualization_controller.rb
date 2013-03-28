class VisualizationController < ApplicationController
def index
 @chart = LazyHighCharts::HighChart.new('graph') do |f|
    f.title({ :text=>"Foodweb Ladder Rankings"})
    f.options[:xAxis][:categories] = ['Citations']
User.find_each do |user|
f.series(:type=> 'column',:name=> user.email,:data=> [Citations.where(:user_id => user.id ).count ])
end  

    
      
end
end
end
