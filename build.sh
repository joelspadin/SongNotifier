
name="SongNotifier"

rm -f ./$name.oex
zip -r ./$name.zip ./config.xml ./includes/* ./script/* ./img/* ./*.html ./*.css ./*.js
mv ./$name.zip ./$name.oex
