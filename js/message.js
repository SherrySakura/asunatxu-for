export default {
    toast: function (context, type, content) {
        context.$Message[type]({
            background: true,
            content: content
        })
    },

    notice: function (context, type, content, onlyTitle, title) {
        switch (type) {
            case "info":
                context.$Notice.info({
                    title: title,
                    desc: onlyTitle ? '' : content
                });
                break
        }

    }
}