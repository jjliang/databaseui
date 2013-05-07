class CitationsController < ApplicationController
  # GET /citations
  # GET /citations.json
  
  autocomplete :citation, :title, :full => true, :extra_data => [:id]
  helper_method :create_author_cites
  
  def index
    @citations = Citation.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @citations }
    end
  end

  # GET /citations/1
  # GET /citations/1.json
  def show
    @citation = Citation.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @citation }
    end
  end

  # GET /citations/new
  # GET /citations/new.json
  def new
    @citation = Citation.new
    @citation.user_id = current_user.id
    @citation.project_id = current_user.project_id
    authorcite = @citation.build_author_cites
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @citation }
    end
  end

  # GET /citations/1/edit
  def edit
    @citation = Citation.find(params[:id])
  end

  # POST /citations
  # POST /citations.json
  def create
    @citation = Citation.new(params[:citation])
    @citation.user_id = current_user.id
    @citation.project_id = current_user.project_id
    @authors = params[:auts].split(",")
    
   

    respond_to do |format|
      if @citation.save
				create_author_cites(@authors, @citation)
        format.html { redirect_to root_path(tab:"newcite") }
        flash[:notice] = ("Citation " + @citation.title + " has been added")
        format.json { render json: @citation, status: :created, location: @citation }
      else
        format.html { render action: "new" }
        format.json { render json: @citation.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /citations/1
  # PUT /citations/1.json
  def update
    @citation = Citation.find(params[:id])

    respond_to do |format|
      if @citation.update_attributes(params[:citation])
        format.html { redirect_to @citation, notice: 'Citation was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @citation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /citations/1
  # DELETE /citations/1.json
  def destroy
    @citation = Citation.find(params[:id])
    citTitle = @citation.title
    @citation.destroy

    respond_to do |format|
      format.html { redirect_to root_path(tab:"citelist") }
        flash[:notice] = ("Citation " + citTitle + " has been deleted")
      format.json { head :no_content }
    end
  end
  
  def create_author_cites(autArray, citation)
    @authors.each do |i|
    	 @author_cite = AuthorCite.new()
       @author_cite.project_id = current_user.id
       @author_cite.user_id = current_user.id
       @author_cite.author_id = i.to_i
       @author_cite.citation = citation
     end
   end
end
