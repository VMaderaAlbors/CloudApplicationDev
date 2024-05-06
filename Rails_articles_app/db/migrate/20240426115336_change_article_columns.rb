class ChangeArticleColumns < ActiveRecord::Migration[7.1]
  def change
    change_column :articles, :title, :string, limit: 40
    change_column :articles, :body, :text 
  end
end