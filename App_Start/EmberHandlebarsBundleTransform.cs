// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EmberHandlebarsBundleTransform.cs" company="UCL">
//   Jo. Don't steal my stuff
// </copyright>
// <summary>
//   Defines the EmberHandlebarsBundleTransform type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace OccupOSMonitor.App_Start {
    using System.IO;
    using System.Web;
    using System.Web.Optimization;

    using Ember.Handlebars;

    using OccupOSMonitor.Helpers;

    /// <summary>
    /// The ember handlebars bundle transform.
    /// </summary>
    public class EmberHandlebarsBundleTransform : IBundleTransform {
        /// <summary>
        /// The process.
        /// </summary>
        /// <param name="context">
        /// The context.
        /// </param>
        /// <param name="response">
        /// The response.
        /// </param>
        public void Process(BundleContext context, BundleResponse response) {
            var builder = new TemplateBuilder();
            foreach (var assetFile in response.Files) {
                var path = context.HttpContext.Server.MapPath(assetFile.VirtualPath);
                var template = File.ReadAllText(path);
                var templateName = Path.GetFileNameWithoutExtension(path).ToCamelCase();
                /*System.Diagnostics.Debug.WriteLine("-----------------------");
                System.Diagnostics.Debug.WriteLine(templateName);
                System.Diagnostics.Debug.WriteLine(template);
                System.Diagnostics.Debug.WriteLine("-----------------------");*/
                builder.Register(templateName, template);
            }

            response.Content = builder.ToString();
            response.ContentType = "text/javascript";
            response.Cacheability = HttpCacheability.Public;
        }
    }
}