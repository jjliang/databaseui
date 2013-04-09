class NonItisController < ApplicationController
  # GET /non_itis
  # GET /non_itis.json
  def index
    @non_itis = NonIti.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @non_itis }
    end
  end

  # GET /non_itis/1
  # GET /non_itis/1.json
  def show
    @non_iti = NonIti.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @non_iti }
    end
  end

  # GET /non_itis/new
  # GET /non_itis/new.json
  def new
    @non_iti = NonIti.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @non_iti }
    end
  end

  # GET /non_itis/1/edit
  def edit
    @non_iti = NonIti.find(params[:id])
  end

  # POST /non_itis
  # POST /non_itis.json
  def create
    @non_iti = NonIti.new(params[:non_iti])
    @non_iti.project_id = current_user.project_id
    @non_iti.user_id = current_user.id

    respond_to do |format|
      if @non_iti.save
        format.html { redirect_to @non_iti, notice: 'Non iti was successfully created.' }
        format.json { render json: @non_iti, status: :created, location: @non_iti }
      else
        format.html { render action: "new" }
        format.json { render json: @non_iti.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /non_itis/1
  # PUT /non_itis/1.json
  def update
    @non_iti = NonIti.find(params[:id])

    respond_to do |format|
      if @non_iti.update_attributes(params[:non_iti])
        format.html { redirect_to @non_iti, notice: 'Non iti was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @non_iti.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /non_itis/1
  # DELETE /non_itis/1.json
  def destroy
    @non_iti = NonIti.find(params[:id])
    @non_iti.destroy

    respond_to do |format|
      format.html { redirect_to non_itis_url }
      format.json { head :no_content }
    end
  end
end
