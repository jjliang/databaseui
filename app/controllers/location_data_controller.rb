class LocationDataController < ApplicationController
  # GET /location_data
  # GET /location_data.json
  def index
    @location_data = LocationDatum.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @location_data }
    end
  end

  # GET /location_data/1
  # GET /location_data/1.json
  def show
    @location_datum = LocationDatum.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @location_datum }
    end
  end

  # GET /location_data/new
  # GET /location_data/new.json
  def new
    @location_datum = LocationDatum.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @location_datum }
    end
  end

  # GET /location_data/1/edit
  def edit
    @location_datum = LocationDatum.find(params[:id])
  end

  # POST /location_data
  # POST /location_data.json
  def create
    @location_datum = LocationDatum.new(params[:location_datum])
	@location_datum.user_id = current_user.id
    @location_datum.project_id = current_user.project_id
	
	
	@location_datum.latitude = @location_datum.latitude.split(",")
	@location_datum.longitude = @location_datum.longitude.split(",")
	
    respond_to do |format|
      if @location_datum.save
        format.html { redirect_to :back, notice: 'Location datum was successfully created.' }
        format.json { render json: @location_datum, status: :created, location: @location_datum }
      else
        format.html { render action: "new" }
        format.json { render json: @location_datum.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /location_data/1
  # PUT /location_data/1.json
  def update
    @location_datum = LocationDatum.find(params[:id])

    respond_to do |format|
      if @location_datum.update_attributes(params[:location_datum])
        format.html { redirect_to @location_datum, notice: 'Location datum was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @location_datum.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /location_data/1
  # DELETE /location_data/1.json
  def destroy
    @location_datum = LocationDatum.find(params[:id])
    @location_datum.destroy

    respond_to do |format|
      format.html { redirect_to location_data_url }
      format.json { head :no_content }
    end
  end
end
