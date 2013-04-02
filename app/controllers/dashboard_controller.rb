class DashboardController < ApplicationController
 
  def index
  end
  
  def dataentry
  @author = Author.new
  @authorlist = Author.all
  @citation = Citation.new
  @citationlist = Citation.all
  @node = Node.new
  @non_iti = Non_Iti.new
  @nodelist = Node.all
  end

  
end
