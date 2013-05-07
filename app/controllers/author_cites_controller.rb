class AuthorCitesController < ApplicationController
  # GET /author_cites
  # GET /author_cites.json
  def index
    @author_cites = AuthorCite.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @author_cites }
    end
  end

  # GET /author_cites/1
  # GET /author_cites/1.json
  def show
    @author_cite = AuthorCite.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @author_cite }
    end
  end

  # GET /author_cites/new
  # GET /author_cites/new.json
  def new
    @author_cite = AuthorCite.new
		@author_cite.user_id = current_user.id
    @author_cite.project_id = current_user.project_id
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @author_cite }
    end
  end

  # GET /author_cites/1/edit
  def edit
    @author_cite = AuthorCite.find(params[:id])
  end

  # POST /author_cites
  # POST /author_cites.json
  def create
    @author_cite = AuthorCite.new(params[:author_cite])
		@author_cite.user_id = current_user.id
    @author_cite.project_id = current_user.project_id
    respond_to do |format|
      if @author_cite.save
        format.html { redirect_to @author_cite, notice: 'Author cite was successfully created.' }
        format.json { render json: @author_cite, status: :created, location: @author_cite }
      else
        format.html { render action: "new" }
        format.json { render json: @author_cite.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /author_cites/1
  # PUT /author_cites/1.json
  def update
    @author_cite = AuthorCite.find(params[:id])

    respond_to do |format|
      if @author_cite.update_attributes(params[:author_cite])
        format.html { redirect_to @author_cite, notice: 'Author cite was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @author_cite.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /author_cites/1
  # DELETE /author_cites/1.json
  def destroy
    @author_cite = AuthorCite.find(params[:id])
    @author_cite.destroy

    respond_to do |format|
      format.html { redirect_to author_cites_url }
      format.json { head :no_content }
    end
  end
end
