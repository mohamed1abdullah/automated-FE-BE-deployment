# Setup nodes
minikube start --nodes 3

# Sleep
sleep 3
## Create taint
kubectl taint nodes minikube master=master:NoSchedule

kubectl taint nodes minikube-m02 fe-worker=fe-worker:NoSchedule

kubectl taint nodes minikube-m03 be-worker=be-worker:NoSchedule

# Create namespace
kubectl create ns fe-ns

kubectl create ns be-ns

# Add db to node
minikube ssh -n minikube-m03 mkdir /home/docker/db

minikube ssh -n minikube-m03 'echo "-- create table and insert your data
CREATE TABLE IF NOT EXISTS profile (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
phone TEXT,
email TEXT,
linkedin TEXT
);
DELETE FROM profile;
INSERT INTO profile (name, phone, email, linkedin) VALUES (
'\''Mohamed Abdullah'\'',
'\''01016293580'\'',
'\''mohamed.abdallah0162@gmail.com'\'',
'\''https://www.linkedin.com/in/mohamed1abdullah/'\''
);" | sudo tee /home/docker/db/seed.sql > /dev/null'

# Sleep 
sleep 5

# Apply k8s files
kubectl apply -f /home/ubuntu/automated-FE-BE-deployment/k8s/frontend/

kubectl apply -f /home/ubuntu/automated-FE-BE-deployment/k8s/backend/

# Sleep till pod is running
sleep 20

# make port forward for services
kubectl port-forward svc/be-service 3000:3000 -n be-ns &
kubectl port-forward svc/fe-service 8080:80 -n fe-ns &
