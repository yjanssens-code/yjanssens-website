# Enterprise-grade Nginx container for static website
# Using Red Hat UBI for enterprise support and security scanning

FROM registry.access.redhat.com/ubi9/nginx-124:latest

# Labels for OpenShift and enterprise compliance
LABEL maintainer="yves322@hotmail.com" \
      app.kubernetes.io/name="yjanssens-website" \
      app.kubernetes.io/component="frontend" \
      app.kubernetes.io/part-of="yjanssens" \
      io.openshift.tags="nginx,static,website" \
      io.k8s.description="Personal website - yjanssens.be"

# Copy website content
COPY --chown=1001:0 src/ /opt/app-root/src/

# Copy custom nginx configuration
COPY --chown=1001:0 nginx.conf /opt/app-root/etc/nginx.d/default.conf

# OpenShift runs containers as non-root with random UID
USER 1001

# Expose port 8080 (non-privileged)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
