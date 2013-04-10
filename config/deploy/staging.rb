set :rails_env, :staging

    after "deploy:update_code", :dbsetup
    after "deploy:dbsetup", :precompile_assets
    desc "precompile the assets"
    task :dbsetup, :roles => :app do
    	run "cd #{release_path} && RAILS_ENV = #{rails_env} bundle exec rake db:setup"
    end
    task :precompile_assets, :roles => :app do
    run "cd #{release_path} && RAILS_ENV=#{rails_env} bundle exec      rake assets:precompile"
 
