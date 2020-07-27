FactoryBot.define do
#messageモデルのダミーインスタンスの作成
  factory :message do
    content {Faker::Lorem.sentence}
    image   {File.open("#{Rails.root}/public/images/test_image.jpg")}
    user
    group
  end
end
