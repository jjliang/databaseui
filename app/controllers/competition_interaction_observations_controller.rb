class CompetitionInteractionObservationsController < ApplicationController

    def add_competition
	@stage1 = params[:competition_interaction_observation][:stage1]
	@stage2 = params[:competition_interaction_observation][:stage2]
	params[:competition_interaction_observation].delete(:stage1)
	params[:competition_interaction_observation].delete(:stage2)
    @competition_interaction_observation = CompetitionInteractionObservation.new(params[:competition_interaction_observation])
	@competition_interaction_observation.user_id = current_user.id
	@competition_interaction_observation.project_id = current_user.project_id
	@competition_interaction_observation.location_id = 0
	@competition_interaction_observation.competition_interaction_id = CompetitionInteraction.where(:stage_1_id => @stage1,
	:stage_2_id => @stage2).first.id
	render :json => [@competition_interaction_observation.save]
		

  end
  
  # GET /competition_interaction_observations
  # GET /competition_interaction_observations.json  
  
  def index
    @competition_interaction_observations = CompetitionInteractionObservation.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @competition_interaction_observations }
    end
  end

  # GET /competition_interaction_observations/1
  # GET /competition_interaction_observations/1.json
  def show
    @competition_interaction_observation = CompetitionInteractionObservation.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @competition_interaction_observation }
    end
  end

  # GET /competition_interaction_observations/new
  # GET /competition_interaction_observations/new.json
  def new
    @competition_interaction_observation = CompetitionInteractionObservation.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @competition_interaction_observation }
    end
  end

  # GET /competition_interaction_observations/1/edit
  def edit
    @competition_interaction_observation = CompetitionInteractionObservation.find(params[:id])
  end

  # POST /competition_interaction_observations
  # POST /competition_interaction_observations.json
  def create
    @competition_interaction_observation = CompetitionInteractionObservation.new(params[:competition_interaction_observation])
	@competition_interaction_observation.user_id = current_user.id
	@competition_interaction_observation.project_id = current_user.project_id
    respond_to do |format|
      if @competition_interaction_observation.save
        format.html { redirect_to @competition_interaction_observation, notice: 'Competition interaction observation was successfully created.' }
        format.json { render json: @competition_interaction_observation, status: :created, location: @competition_interaction_observation }
      else
        format.html { render action: "new" }
        format.json { render json: @competition_interaction_observation.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /competition_interaction_observations/1
  # PUT /competition_interaction_observations/1.json
  def update
    @competition_interaction_observation = CompetitionInteractionObservation.find(params[:id])

    respond_to do |format|
      if @competition_interaction_observation.update_attributes(params[:competition_interaction_observation])
        format.html { redirect_to @competition_interaction_observation, notice: 'Competition interaction observation was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @competition_interaction_observation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /competition_interaction_observations/1
  # DELETE /competition_interaction_observations/1.json
  def destroy
    @competition_interaction_observation = CompetitionInteractionObservation.find(params[:id])
    @competition_interaction_observation.destroy

    respond_to do |format|
      format.html { redirect_to competition_interaction_observations_url }
      format.json { head :no_content }
    end
  end
end
