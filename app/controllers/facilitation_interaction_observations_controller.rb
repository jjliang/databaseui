class FacilitationInteractionObservationsController < ApplicationController

    def add_facilitation
	@stage1 = params[:facilitation_interaction_observation][:stage1]
	@stage2 = params[:facilitation_interaction_observation][:stage2]
	params[:facilitation_interaction_observation].delete(:stage1)
	params[:facilitation_interaction_observation].delete(:stage2)
    @facilitation_interaction_observation = FacilitationInteractionObservation.new(params[:facilitation_interaction_observation])
	@facilitation_interaction_observation.user_id = current_user.id
	@facilitation_interaction_observation.project_id = current_user.project_id
	@facilitation_interaction_observation.location_id = 0
	@facilitation_interaction_observation.facilitation_interaction_id = FacilitationInteraction.where(:stage_1_id => @stage1,
	:stage_2_id => @stage2).first.id
	render :json => [@facilitation_interaction_observation.save]

	end








  # GET /facilitation_interaction_observations
  # GET /facilitation_interaction_observations.json
  def index
    @facilitation_interaction_observations = FacilitationinteractionObservation.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @facilitation_interaction_observations }
    end
  end

  # GET /facilitation_interaction_observations/1
  # GET /facilitation_interaction_observations/1.json
  def show
    @facilitation_interaction_observation = FacilitationInteractionObservation.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @facilitation_interaction_observation }
    end
  end

  # GET /facilitation_interaction_observations/new
  # GET /facilitation_interaction_observations/new.json
  def new
    @facilitation_interaction_observation = FacilitationinteractionObservation.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @facilitation_interaction_observation }
    end
  end

  # GET /facilitation_interaction_observations/1/edit
  def edit
    @facilitation_interaction_observation = FacilitationinteractionObservation.find(params[:id])
  end

  # POST /facilitation_interaction_observations
  # POST /facilitation_interaction_observations.json
  def create
    @facilitation_interaction_observation = FacilitationinteractionObservation.new(params[:facilitation_interaction_observation])

    respond_to do |format|
      if @facilitation_interaction_observation.save
        format.html { redirect_to @facilitation_interaction_observation, notice: 'Facilitation interaction observation was successfully created.' }
        format.json { render json: @facilitation_interaction_observation, status: :created, location: @facilitation_interaction_observation }
      else
        format.html { render action: "new" }
        format.json { render json: @facilitation_interaction_observation.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /facilitation_interaction_observations/1
  # PUT /facilitation_interaction_observations/1.json
  def update
    @facilitation_interaction_observation = FacilitationinteractionObservation.find(params[:id])

    respond_to do |format|
      if @facilitation_interaction_observation.update_attributes(params[:facilitation_interaction_observation])
        format.html { redirect_to @facilitation_interaction_observation, notice: 'Facilitation interaction observation was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @facilitation_interaction_observation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /facilitation_interaction_observations/1
  # DELETE /facilitation_interaction_observations/1.json
  def destroy
    @facilitation_interaction_observation = FacilitationinteractionObservation.find(params[:id])
    @facilitation_interaction_observation.destroy

    respond_to do |format|
      format.html { redirect_to facilitation_interaction_observations_url }
      format.json { head :no_content }
    end
  end
end
