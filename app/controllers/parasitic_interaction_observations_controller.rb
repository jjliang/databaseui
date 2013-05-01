class ParasiticInteractionObservationsController < ApplicationController
	
	#Add parasitic observation
    def add_parasitic
	@stage1 = params[:parasitic_interaction_observation][:stage1]
	@stage2 = params[:parasitic_interaction_observation][:stage2]
	params[:parasitic_interaction_observation].delete(:stage1)
	params[:parasitic_interaction_observation].delete(:stage2)
    @parasitic_interaction_observation = ParasiticInteractionObservation.new(params[:parasitic_interaction_observation])
	@parasitic_interaction_observation.user_id = current_user.id
	@parasitic_interaction_observation.project_id = current_user.project_id
	@parasitic_interaction_observation.location_id = 0
	@parasitic_interaction_observation.parasitic_interaction_id = ParasiticInteraction.where(:stage_1_id => @stage1,
	:stage_2_id => @stage2).first.id
	render :json => [@parasitic_interaction_observation.save]
	end





  # GET /parasitic_interaction_observations
  # GET /parasitic_interaction_observations.json
  def index
    @parasitic_interaction_observations = ParasiticInteractionObservation.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @parasitic_interaction_observations }
    end
  end

  # GET /parasitic_interaction_observations/1
  # GET /parasitic_interaction_observations/1.json
  def show
    @parasitic_interaction_observation = ParasiticInteractionObservation.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @parasitic_interaction_observation }
    end
  end

  # GET /parasitic_interaction_observations/new
  # GET /parasitic_interaction_observations/new.json
  def new
    @parasitic_interaction_observation = ParasiticInteractionObservation.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @parasitic_interaction_observation }
    end
  end

  # GET /parasitic_interaction_observations/1/edit
  def edit
    @parasitic_interaction_observation = ParasiticInteractionObservation.find(params[:id])
  end

  # POST /parasitic_interaction_observations
  # POST /parasitic_interaction_observations.json
  def create
    @parasitic_interaction_observation = ParasiticInteractionObservation.new(params[:parasitic_interaction_observation])

    respond_to do |format|
      if @parasitic_interaction_observation.save
        format.html { redirect_to @parasitic_interaction_observation, notice: 'Parasitic interaction observation was successfully created.' }
        format.json { render json: @parasitic_interaction_observation, status: :created, location: @parasitic_interaction_observation }
      else
        format.html { render action: "new" }
        format.json { render json: @parasitic_interaction_observation.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /parasitic_interaction_observations/1
  # PUT /parasitic_interaction_observations/1.json
  def update
    @parasitic_interaction_observation = ParasiticInteractionObservation.find(params[:id])

    respond_to do |format|
      if @parasitic_interaction_observation.update_attributes(params[:parasitic_interaction_observation])
        format.html { redirect_to @parasitic_interaction_observation, notice: 'Parasitic interaction observation was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @parasitic_interaction_observation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /parasitic_interaction_observations/1
  # DELETE /parasitic_interaction_observations/1.json
  def destroy
    @parasitic_interaction_observation = ParasiticInteractionObservation.find(params[:id])
    @parasitic_interaction_observation.destroy

    respond_to do |format|
      format.html { redirect_to parasitic_interaction_observations_url }
      format.json { head :no_content }
    end
  end
end
