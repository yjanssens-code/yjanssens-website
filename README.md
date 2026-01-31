# yjanssens.be - Personal Website

A retro-style personal website deployed on OKD using enterprise CI/CD practices.

## Architecture

- **Runtime**: Nginx (Red Hat UBI9)
- **Platform**: OKD 4.21 on Proxmox
- **CI/CD**: OpenShift Pipelines (Tekton)
- **TLS**: cert-manager with Let's Encrypt

## Directory Structure
```
├── src/                    # Website source files
│   ├── index.html
│   ├── assets/
│   └── photos/
├── k8s/                    # Kubernetes manifests
│   ├── namespace.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── route-tls.yaml
│   └── certificate.yaml
├── pipelines/              # Tekton pipeline definitions
├── .tekton/                # Tekton triggers
├── Dockerfile
├── nginx.conf
└── README.md
```

## Deployment

### Manual Build
```bash
oc new-project yjanssens
oc apply -f k8s/
oc start-build yjanssens-website
```

### Pipeline (Automated)
Push to main branch triggers automatic build and deploy.

## URLs

- Production: https://yjanssens.be
- www redirect: https://www.yjanssens.be

## Maintainer

Yves Janssens <yves322@hotmail.com>
