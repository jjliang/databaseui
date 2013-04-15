  $LOAD_PATH.unshift File.join(File.dirname(__FILE__), 'deploy')
  require "capistrano_database.rb"
  require "bundler/capistrano"
	require "rvm/capistrano"
	
	set :rvm_ruby_string, "2.0.0"
	set :rvm_type, :user

set :application, "FoodWebBuilder"
#default_run_options[:pty] = true  # Must be set for the password prompt from #git to work
set :default_stage, "staging" 
set :repository, "http://github.com/jjliang/databaseui.git"  # Your clone URL
set :scm, 'git'
set :branch, "staging"
#set :deploy_via, :remote_cache  #If omitted each deploy will do a full repository clone 
#set :git_shallow_clone, 1  # only copy the most recent, not the entire repository (default:1)  

# set :deploy_to, "/var/www" #specify where on the server our application resides 
set :deploy_to, "/var/rails/fwb"
set :user, "fwb" #The servers user for deploys
set :use_sudo, false
set :scm_password, Proc.new { Capistrano::CLI.password_prompt "SCM Password: "}

role :web, "fwb.cs.umb.edu"
role :app, "fwb.cs.umb.edu"
role :db, "fwb.cs.umb.edu", :primary => true

set :rails_env, :staging
set :unicorn_binary, "/var/rails/fwb/.rvm/bin/bootup_unicorn"
set :unicorn_config, "#{current_path}/config/unicorn.rb"
set :unicorn_pid, "#{current_path}/tmp/pids/unicorn.pid"

namespace :deploy do

	desc "starting the Food Web Builder"
	task :start, :roles => :app, :except => { :no_release => true} do
		run "cd #{current_path} && #{try_sudo} #{unicorn_binary} -c #{unicorn_config} -E #{rails_env} -D"
	end 
	
	task :stop, :roles => :app, :except => { :no_release => true} do
		run "#{try_sudo} kill `cat #{unicorn_pid}`"
	end
	task :graceful_stop, :roles => :app, :except => { :no_release => true} do
		run "#{try_sudo} kill -s QUIT `cat #{unicorn_pid}`"
	end
	task :reload, :roles => :app, :except => { :no_release => true} do
		run "#{try_sudo} kill -s USR2 `cat #{unicorn_pid}`"
	end
	task :create do
	run "cd #{current_path} && rake db:setup"
	end
	task :restart, :roles => :app, :except => { :no_release => true} do
	 stop
	 start
	end
	task :cold do
	  transaction do
	    update
	    setup_db
	    start
	  end
	end

	task :setup_db, :roles => :app do
	  raise RuntimeError.new('db:setup aborted!') unless Capistrano::CLI.ui.ask("About to `rake db:setup`. Are you sure to 	wipe the entire database (anything other than 'yes' aborts):") == 'yes'
	  run "cd #{current_path}; bundle exec rake db:setup RAILS_ENV=#{rails_env}"
	end
	
	task :seed_db, :roles => :app do
		  raise RuntimeError.new('db:seed aborted!') unless Capistrano::CLI.ui.ask("About to `rake db:seed`. Are you sure to seed data into the database (anything other than 'yes' aborts):") == 'yes'
	  run "cd #{current_path}; bundle exec rake db:seed RAILS_ENV=#{rails_env}"
	end
	
	task :rvm_stable, :roles => :app do
		run"cd #{current_path}; rvm get stable"
	end
	

end



