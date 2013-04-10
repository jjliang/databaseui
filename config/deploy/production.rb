set :rails_env, :production

    after "deploy:update_code", :precompile_assets
    desc "precompile the assets"
    task :precompile_assets, :roles => :app do
    run "cd #{release_path} && RAILS_ENV=#{rails_env} bundle exec      rake assets:precompile"

