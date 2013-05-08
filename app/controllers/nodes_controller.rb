class NodesController < ApplicationController
  # GET /nodes
  # GET /nodes.json
  autocomplete :node, :working_name, :full => true, :extra_data => [:itis_id,:id],:display_value => :display_node

  
  def search_by_tsn
	@tsn = params[:tsn]
	
	workingname = Node.where(:itis_id =>@tsn).first
	
	if workingname == nil
		success = false
	else
		success = true
		workingname = workingname
	end
	
	render :json =>[success,workingname]
  end
skip_before_filter :authenticate_user!, :only => [:index]
#prepend_before_filter :authenticate_scope!, :only => [:edit, :update, :destroy]

  def index
    @nodes = Node.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @nodes }
      format.csv {render :text=>Node.to_csv}
    end
  end

  # GET /nodes/1
  # GET /nodes/1.json
  def show
    @node = Node.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @node }
    end
  end

  # GET /nodes/new
  # GET /nodes/new.json
  def new
    @node = Node.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @node }
    end
  end

  # GET /nodes/1/edit
  def edit
    @node = Node.find(params[:id])
  end

  # POST /nodes
  # POST /nodes.json
  def create
    @node = Node.new(params[:node])
    @node.project_id = current_user.project_id
    @node.user_id = current_user.id
	@node.approved = true
	@node.mod = true
	puts @node.inspect
    respond_to do |format|
      if @node.save
        format.html { redirect_to root_path(tab:"newnode"), notice: 'Node ' + @node.working_name + ' has been added'}
        format.json { render json: @node, status: :created, location: @node }
      else
		flash[:error] = @node.errors
        format.html { redirect_to root_path(tab:"newnode")}
        format.json { render json: @node.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /nodes/1
  # PUT /nodes/1.json
  def update
    @node = Node.find(params[:id])

    respond_to do |format|
      if @node.update_attributes(params[:node])
        format.html { redirect_to @node, notice: 'Node was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @node.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /nodes/1
  # DELETE /nodes/1.json
  def destroy
    @node = Node.find(params[:id])
    myWorkingName = @node.working_name
    @node.destroy

    respond_to do |format|
      flash[:notice] = ("Node " + myWorkingName + " has been deleted")
      format.html { redirect_to root_path(tab:"nodelist") }
      format.json { head :no_content }
    end
  end
end
