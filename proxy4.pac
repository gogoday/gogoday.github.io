function FindProxyForURL(url, host) {
    if (isInNet(dnsResolve(host), "127.0.0.1", "255.255.255.0"))
        return "DIRECT";

    else
        return "PROXY 10.66.150.228:8080";
}