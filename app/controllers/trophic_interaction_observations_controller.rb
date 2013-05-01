class TrophicInteractionObservationsController < ApplicationController

    def add_trophic
	@stage1 = params[:trophic_interaction_observation][:stage1]
	@stage2 = params[:trophic_interaction_observation][:stage2]
	params[:trophic_interaction_observation].delete(:stage1)
	params[:trophic_interaction_observation].delete(:stage2)
    @trophic_interaction_observation = TrophicInteractionObservation.new(params[:trophic_interaction_observation])
	@trophic_interaction_observation.user_id = current_user.id
	@trophic_interaction_observation.project_id = current_user.project_id
	@trophic_interaction_observation.location_id = 0
	@trophic_interaction_observation.trophic_interaction_id = TrophicInteraction.where(:stage_1_id => @stage1,
	:stage_2_id => @stage2).first.id
	render :json => [@trophic_interaction_observation.save]
	end







  # GET /trophic_interaction_observations
  # GET /trophic_interaction_observations.json
  def index
    @trophic_interaction_observations = TrophicInteractionObservation.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @trophic_interaction_observations }
    end
  end

  # GET /trophic_interaction_observations/1
  # GET /trophic_interaction_observations/1.json
  def show
    @trophic_interaction_observation = TrophicInteractionObservation.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @trophic_interaction_observation }
    end
  end

  # GET /trophic_interaction_observations/new
  # GET /trophic_interaction_observations/new.json
  def new
    @trophic_interaction_observation = TrophicInteractionObservation.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @trophic_interaction_observation }
    end
  end

  # GET /trophic_interaction_observations/1/edit
  def edit
    @trophic_interaction_observation = TrophicInteractionObservation.find(params[:id])
  end

  # POST /trophic_interaction_observations
  # POST /trophic_interaction_observations.json
  def create
    @trophic_interaction_observation = TrophicInteractionObservation.new(params[:trophic_interaction_observation])

    respond_to do |format|
      if @trophic_interaction_observation.save
        format.html { redirect_to @trophic_interaction_observation, notice: 'Trophic interaction observation was successfully created.' }
        format.json { render json: @trophic_interaction_observation, status: :created, location: @trophic_interaction_observation }
      else
        format.html { render action: "new" }
        format.json { render json: @trophic_interaction_observation.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /trophic_interaction_observations/1
  # PUT /trophic_interaction_observations/1.json
  def update
    @trophic_interaction_observation = TrophicInteractionObservation.find(params[:id])

    respond_to do |format|
      if @trophic_interaction_observation.update_attributes(params[:trophic_interaction_observation])
        format.html { redirect_to @trophic_interaction_observation, notice: 'Trophic interaction observation was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @trophic_interaction_observation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /trophic_interaction_observations/1
  # DELETE /trophic_interaction_observations/1.json
  def destroy
    @trophic_interaction_observation = TrophicInteractionObservation.find(params[:id])
    @trophic_interaction_observation.destroy

    respond_to do |format|
      format.html { redirect_to trophic_interaction_observations_url }
      format.json { head :no_content }
    end
  end
end
