class DashboardController < ApplicationController

	def index
	
	##For new stage in interactions
	@new_stage = Stage.new
	
	## For Users Tab objects can be reused in other partials also
		@users = User.all
		@userlist = User.where(["project_id = ?",current_user.project_id] && ["approved = false"]).all
	
	## For Citations tab objects can be reused by other partials
		@author = Author.new
		@citation = Citation.new
		@authorlist = Author.where(["project_id = ?",current_user.project_id]).all
		@citationlist = Citation.where(["project_id = ?",current_user.project_id]).all
		@current_year = Time.now.year
		@citation.author_cites.build
		
	## For Node tab objects can be reused by other partials also
		@node = Node.new
		@non_iti = NonIti.new
		@nodelist = Node.where(["project_id = ?",current_user.project_id]).all
		
	## For projects tab
		@project = Project.new
		
	## For Regions tab
		@location_datum = LocationDatum.new
		##For google maps
			#Code for generating polygons
			counter = 0
			#Users and project lead can only see regions belonging to their project
			if current_user.role == 'user' || 'lead'	
				@polygons = Array.new(LocationDatum.where(["project_id = ?",current_user.project_id]).count) { Array.new }
				LocationDatum.where(["project_id = ?",current_user.project_id]).find_each do |location|
				location.latitude.each_index do |index|
					@polygons[counter] << { :lat => location.latitude[index], :lng =>location.longitude[index], :id=>location.id}
				end
			counter += 1
			end
		else
			@polygons = Array.new(LocationDatum.count) { Array.new }
			LocationDatum.find_each do |location|
				location.latitude.each_index do |index|
					@polygons[counter] << { :lat => location.latitude[index], :lng =>location.longitude[index]}
				end
				counter += 1
			end  
		end

		@polygons2 = Array.new(@polygons)	
		@polygons = @polygons.to_json
		@polygons2 = @polygons2.to_json
	respond_to do |format|
		format.html
		format.json { render json: @polygons }   
		format.json { render json: @polygons2 }   
	end

end

	def search
		q = params[:working]
		@nodesearch = Node.find(:all, :conditions => ['working_name LIKE ?', "#{q}%"])
	end

	
	def search_interactions
		@p = params[:interaction]
		if @p[:interactionname] == "trophic"
			@interaction = TrophicInteraction.new();
			@interaction.stage_1_id = Stage.where(:node_id => @p[:node_id1], :name => @p[:name1]).first.id
			@interaction.stage_2_id = Stage.where(:node_id => @p[:node_id2], :name => @p[:name2]).first.id
			exist = TrophicInteraction.where(:stage_1_id => @interaction.stage_1_id,:stage_2_id => @interaction.stage_2_id ).exists?
		elsif @p[:interactionname] == "competition"
			@interaction = CompetitionInteraction.new();
			@interaction.stage_1_id = Stage.where(:node_id => @p[:node_id1], :name => @p[:name1]).first.id
			@interaction.stage_2_id = Stage.where(:node_id => @p[:node_id2], :name => @p[:name2]).first.id
			exist = CompetitionInteraction.where(:stage_1_id => @interaction.stage_1_id,:stage_2_id => @interaction.stage_2_id ).exists?
		elsif @p[:interactionname] == "facilitation"
			@interaction = FacilitationInteraction.new();
			@interaction.stage_1_id = Stage.where(:node_id => @p[:node_id1], :name => @p[:name1]).first.id
			@interaction.stage_2_id = Stage.where(:node_id => @p[:node_id2], :name => @p[:name2]).first.id
			exist = FacilitationInteraction.where(:stage_1_id => @interaction.stage_1_id,:stage_2_id => @interaction.stage_2_id ).exists?
		elsif @p[:interactionname] == "parasitic"
			@interaction = ParasiticInteraction.new();
			@interaction.stage_1_id = Stage.where(:node_id => @p[:node_id1], :name => @p[:name1]).first.id
			@interaction.stage_2_id = Stage.where(:node_id => @p[:node_id2], :name => @p[:name2]).first.id
			exist = ParasiticInteraction.where(:stage_1_id => @interaction.stage_1_id,:stage_2_id => @interaction.stage_2_id ).exists?
		end
			render :json => [exist]
	end	
	
	#For adding interactions given stage 1 stage 2
	def add_interactions
		@p = params[:interaction]
		if @p[:interactionname] == "trophic"
			@interaction = TrophicInteraction.new();
			@interaction.stage_1_id = Stage.where(:node_id => @p[:node_id1], :name => @p[:name1]).first.id
			@interaction.stage_2_id = Stage.where(:node_id => @p[:node_id2], :name => @p[:name2]).first.id
			newinteraction = !TrophicInteraction.where(:stage_1_id => @interaction.stage_1_id,:stage_2_id => @interaction.stage_2_id ).exists?
		elsif @p[:interactionname] == "competition"
			@interaction = CompetitionInteraction.new();
			@interaction.stage_1_id = Stage.where(:node_id => @p[:node_id1], :name => @p[:name1]).first.id
			@interaction.stage_2_id = Stage.where(:node_id => @p[:node_id2], :name => @p[:name2]).first.id
			newinteraction = !CompetitionInteraction.where(:stage_1_id => @interaction.stage_1_id,:stage_2_id => @interaction.stage_2_id ).exists?
		elsif @p[:interactionname] == "facilitation"
			@interaction = FacilitationInteraction.new();
			@interaction.stage_1_id = Stage.where(:node_id => @p[:node_id1], :name => @p[:name1]).first.id
			@interaction.stage_2_id = Stage.where(:node_id => @p[:node_id2], :name => @p[:name2]).first.id
			newinteraction = !FacilitationInteraction.where(:stage_1_id => @interaction.stage_1_id,:stage_2_id => @interaction.stage_2_id ).exists?
		elsif @p[:interactionname] == "parasitic"
			@interaction = ParasiticInteraction.new();
			@interaction.stage_1_id = Stage.where(:node_id => @p[:node_id1], :name => @p[:name1]).first.id
			@interaction.stage_2_id = Stage.where(:node_id => @p[:node_id2], :name => @p[:name2]).first.id
			newinteraction = !ParasiticInteraction.where(:stage_1_id => @interaction.stage_1_id,:stage_2_id => @interaction.stage_2_id ).exists?
		end
		
		if newinteraction == true
			@interaction.project_id = current_user.project_id
			@interaction.user_id = current_user.id
			@interaction.approved = true
			@interaction.mod = true
			respond_to do |format|
				if @interaction.save
					format.html { redirect_to :back, notice: 'Stage was successfully created.' }
					format.json { render json: @interaction, status: :created, location: @interaction }
				end
			end
		else
			render :json => [false]
		end
	end
end
  def create_author
  	@author = Author.new(params[:author])
    @author.project_id = current_user.project_id
    @author.user_id = current_user.id
    
    respond_to do |format|
      if @author.save
      	
        format.html { redirect_to root_path(tab:"newaut",:author => @author) }
        flash[:notice] = ("Author " + @author.first_name + " " + @author.last_name + " has been added")
        format.json { render json: @author, status: :created, location: @author }
      else
        format.html { redirect_to root_path(tab:"newaut", :author => @author) }
        format.json { render json: @author.errors, status: :unprocessable_entity }
      end
	end
end

