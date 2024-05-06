require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  test "should not save article without a title" do
    article = Article.new
    assert_not article.save, "Saved the article without a title"
  end

  test "should not save article without a body" do
    article = Article.new
    assert_not article.save, "Saved the article without a body"
  end


end
