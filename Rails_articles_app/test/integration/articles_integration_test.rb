# test/integration/articles_integration_test.rb

require 'test_helper'

class ArticlesIntegrationTest < ActionDispatch::IntegrationTest
    test "should get articles index" do
        get articles_url
        assert_response :success
    end
    test "should get single article" do
        article = articles(:one)
        get article_url(article)
        assert_response :success
    end

    test "should update article" do
        article = articles(:one)
        updated_title = "test title"
        updated_body = "test body"
        
        patch article_url(article), params: { article: { title: updated_title, body: updated_body } }, as: :json
        
        assert_response :success
        assert_equal updated_title, article.reload.title
        assert_equal updated_body, article.reload.body
      end

      test "should create article" do
        article = articles()
        new_title = "test title"
        new_body = "test body"

        post articles_url, params: { article: { title: new_title, body: new_body } }, as: :json
        assert_response :success
        
        assert_equal new_title, Article.last.title
        assert_equal new_body, Article.last.body
        
        get article_url(Article.last)
        assert_response :success
      end
      
      test "should delete an article" do
        article = articles(:one)
        delete article_url(article)
        assert_response :redirect
      end

    
end