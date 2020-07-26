FactoryBot.define do
#messageモデルのダミーインスタンスの作成
  factory :messages do
    content {Faker::Lorem.sentence}
    image   {"hoge.png"}
    user
    group
  end
end
