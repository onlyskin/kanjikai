aws s3 sync . s3://www.kanjikai.com --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --exclude upload_to_aws.sh --exclude .DS_Store --exclude '*/.DS_Store'