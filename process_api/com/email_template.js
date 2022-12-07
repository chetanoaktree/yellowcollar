import {compile_template} from './handlebars'

const title_table=({title})=>{
    let out=`
    <table border="0" cellpadding="10" cellspacing="0" class="text_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
        <tbody><tr>
            <td class="pad">
                <div style="font-family: Tahoma, Verdana, sans-serif">
                    <div class="txtTinyMce-wrapper" style="font-size: 12px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 21.6px; color: #393d47; line-height: 1.8;">
                        <p style="margin: 0; font-size: 12px; text-align: justify; mso-line-height-alt: 39.6px;"><span style="font-size:22px;">${title}</span></p>
                    </div>
                </div>
            </td>
        </tr>
        </tbody>
    </table>`
    return out
}
const para_table=({content})=>{
    let out=`
    <table border="0" cellpadding="10" cellspacing="0" class="text_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
        <tbody><tr>
            <td class="pad">
                <div style="font-family: Tahoma, Verdana, sans-serif">
                    <div class="txtTinyMce-wrapper" style="font-size: 12px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 21.6px; color: #393d47; line-height: 1.8;">
                        <p style="margin: 0; font-size: 12px; text-align: justify; mso-line-height-alt: 28.8px;"><span style="font-size:16px;">${content}</span></p>
                    </div>
                </div>
            </td>
        </tr></tbody>
    </table>`
    return out
}

const template_simple = ({title, content}) => {
    //var content_footer=para_table(content)
    var content_title = title_table({title})
    var content_content = para_table({content})
    var content_table=`
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
        <tbody>
            <tr>
                <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px; background-image: url('https://platovise.vercel.app/images/email_content_bg.png');
    background-position: center top; background-size: 500px; background-repeat: no-repeat;" width="500">
                        <tbody>
                            <tr>
                                <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; padding-top: 60px; padding-left: 40px;  padding-right: 40px;border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                                    ${content_title}
                                    ${content_content}                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>`
    
    var logo_table=`
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
        <tbody>
            <tr>
                <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                        <tbody>
                            <tr>
                                <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                                    <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                        <tbody><tr>
                                            <td class="pad" style="width:100%;padding-right:0px;padding-left:0px; padding-top:30px; padding-bottom:30px;">
                                                <div align="center" class="alignment" style="line-height:10px"><img alt="logo app" src="https://platovise.vercel.app/Logo.png" style="display: block; height: auto; border: 0; width: 150px; max-width: 100%;" title="logo app" width="150"></div>
                                            </td>
                                            </tr>
                                         </tbody>
                                    </table>                                   
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>`    
    var thankyou_table=`
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-8" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; background-image: url('images/WMD__cornice.png'); background-position: top center; background-repeat: no-repeat;" width="100%">
    <tbody>
        <tr>
            <td>
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                    <tbody>
                    <tr>
                        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                            <table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                <tbody>
                                    <tr>
                                        <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;padding-top:60px;padding-bottom:70px;">
                                        <div align="center" class="alignment" style="line-height:10px"><img alt="thank you" src="https://platovise.vercel.app/images/email_thankyou.png" style="display: block; height: auto; border: 0; width: 120px; max-width: 100%;" title="thank you" width="120"></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>`
    var sm_table=`
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-9" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; " width="100%">
    <tbody>
        <tr>
            <td>
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="background-color: rgba(37,60,100,0.1); border-radius:20px; mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                    <tbody>
                        <tr>
                            <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                                <table border="0" cellpadding="10" cellspacing="0" class="social_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                    <tbody><tr>
                                        <td class="pad">
                                            <div class="alignment" style="text-align:center;">
                                                <table border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;" width="74px">
                                                    <tbody><tr>
                                                        <td style="padding:0 2px 0 2px;"><a href="https://www.linkedin.com/company/yellowcollar" target="_blank"><img alt="Linkedin" height="32" src="https://platovise.vercel.app/images/Linkedin_o.png" style="display: block; height: auto; border: 0;" title="linkedin" width="32"></a></td>
                                                        <td style="padding:0 2px 0 2px;"><a href="https://www.instagram.com/yellowcollarclub" target="_blank"><img alt="Instagram" height="32" src="https://platovise.vercel.app/images/Instagram_o.png" style="display: block; height: auto; border: 0;" title="instagram" width="32"></a></td>
                                                    </tr></tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>`
    var brand_table=`
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-10" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
            <tr>
                <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                        <tbody>
                            <tr>
                                <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                                    <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                        <tbody><tr>
                                            <td class="pad" style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                                                <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                                    <tbody><tr>
                                                        <td class="alignment" style="vertical-align: middle; text-align: center;">                                                        
                                                            <table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;">
                                                                <tbody><tr>                                                                   
                                                                    <td style="font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 15px; color: #9d9d9d; vertical-align: middle; letter-spacing: undefined; text-align: center;">
                                                                        <a href="https://www.yellowcollar.club/" style="color: #9d9d9d; text-decoration: none;" target="_blank">Yellow Collar</a>
                                                                    </td>
                                                                </tr></tbody>
                                                            </table>
                                                        </td>
                                                    </tr></tbody>
                                                </table>
                                            </td>
                                        </tr></tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>`    
    var email_header=`<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml"><head>
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
<!--<![endif]-->
<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		@media (max-width:520px) {
			.desktop_hide table.icons-inner {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.image_block img.big,
			.row-content {
				width: 100% !important;
			}

			.mobile_hide {
				display: none;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}

			.reverse {
				display: table;
				width: 100%;
			}

			.reverse .column.first {
				display: table-footer-group !important;
			}

			.reverse .column.last {
				display: table-header-group !important;
			}

			.row-2 td.column.first>table {
				padding-left: 0;
				padding-right: 10px;
			}

			.row-2 td.column.first .border,
			.row-2 td.column.last .border {
				border-top: 0;
				border-right: 0px;
				border-bottom: 0;
				border-left: 0;
			}

			.row-2 td.column.last>table {
				padding-left: 10px;
				padding-right: 0;
			}
		}
	</style>
</head>
<body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;" width="100%">
<tbody>
<tr>
<td>
`
    var email_footer=`
    </td>
</tr>
</tbody>
</table><!-- End -->

</body></html>`
    var out2=email_header
    out2+=logo_table
    out2+=content_table
    out2+=thankyou_table
    out2+=sm_table
    out2+=brand_table
    out2+=email_footer
    return out2
}


export {
    template_simple
}


