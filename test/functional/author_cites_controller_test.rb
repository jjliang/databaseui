require 'test_helper'

class AuthorCitesControllerTest < ActionController::TestCase
  setup do
    @author_cite = author_cites(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:author_cites)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create author_cite" do
    assert_difference('AuthorCite.count') do
      post :create, author_cite: { author_id: @author_cite.author_id, cite_id: @author_cite.cite_id, user_id: @author_cite.user_id }
    end

    assert_redirected_to author_cite_path(assigns(:author_cite))
  end

  test "should show author_cite" do
    get :show, id: @author_cite
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @author_cite
    assert_response :success
  end

  test "should update author_cite" do
    put :update, id: @author_cite, author_cite: { author_id: @author_cite.author_id, cite_id: @author_cite.cite_id, user_id: @author_cite.user_id }
    assert_redirected_to author_cite_path(assigns(:author_cite))
  end

  test "should destroy author_cite" do
    assert_difference('AuthorCite.count', -1) do
      delete :destroy, id: @author_cite
    end

    assert_redirected_to author_cites_path
  end
end
