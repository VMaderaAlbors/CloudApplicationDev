class Article < ApplicationRecord
    validates :title, presence: true, length: { maximum: 40 }
    validates :body, presence: true, length: { maximum: 1000, too_long: "%{count} characters is the maximum allowed" }
    
    
end
