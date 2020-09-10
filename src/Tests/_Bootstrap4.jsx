function addRules() {
    jss.setup(preset());
    const sheet = jss.createStyleSheet().attach();
    sheet.addRules({
      "@global": {
        body: {
        },
        "@font-face": {
          fontFamily: "Glyphicons Halflings",
          src: "url('glyphicons-halflings-regular.eot')",
        },
      },
    });
  }
  
  